import { Request, Response, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";
import { v2 as cloudinary } from "cloudinary";
import multer from "multer";

const prisma = new PrismaClient();

export const updateProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const userId = req.body.userId;

    if (!userId) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const {
      username,
      firstName,
      lastName,
      PhoneNumber,
      location,
      college,
      headline,
      Gender,
      Skills,
      Interests,
      About,
      degree,
      workorProject,
      startYear,
      endYear,
    } = req.body;

    const existingUser = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!existingUser) {
      return res.status(404).json({ error: "User not found" });
    }

    // Username validation
    if (username && username !== existingUser.username) {
      const usernameRegex = /^[a-zA-Z0-9_]{3,30}$/;
      if (!usernameRegex.test(username)) {
        return res.status(400).json({
          error: "Username must be 3-30 characters long and can only contain letters, numbers, and underscores",
        });
      }

      const usernameExists = await prisma.user.findUnique({
        where: { username },
      });

      if (usernameExists && usernameExists.id !== userId) {
        return res.status(400).json({ error: "Username already taken" });
      }
    }

    let profilePictureUrl = existingUser.profilePictureUrl || "";

    // Handle profile picture upload
    if (req.file) {
      try {
        const result = await cloudinary.uploader.upload(req.file.path, {
          folder: "profile_pictures",
          transformation: [
            { width: 500, height: 500, crop: "fill" },
            { quality: "auto" }
          ]
        });
        profilePictureUrl = result.secure_url;

        // Store media info in database
        await prisma.cloudinaryMedia.create({
          data: {
            publicId: result.public_id,
            url: result.secure_url,
            resourceType: 'image',
            userId
          }
        });
      } catch (error) {
        console.error("Error uploading profile picture:", error);
        return res.status(400).json({ error: "Failed to upload profile picture" });
      }
    }

    // Prepare update data
    const updateData: any = {};

    // Only include fields that are provided in the request
    if (username !== undefined) updateData.username = username;
    if (firstName !== undefined) updateData.firstName = firstName;
    if (lastName !== undefined) updateData.lastName = lastName;
    if (PhoneNumber !== undefined) updateData.PhoneNumber = PhoneNumber;
    if (location !== undefined) updateData.location = location;
    if (About !== undefined) updateData.About = About;
    if (headline !== undefined) updateData.headline = headline;
    if (Gender !== undefined) updateData.Gender = Gender;
    if (workorProject !== undefined) updateData.workorProject = workorProject;
    if (college !== undefined) updateData.college = college;
    if (degree !== undefined) updateData.degree = degree;
    if (startYear !== undefined) updateData.startYear = startYear;
    if (endYear !== undefined) updateData.endYear = endYear;

    // Arrays require special handling
    if (Skills !== undefined) updateData.Skills = Skills;
    if (Interests !== undefined) updateData.Interests = Interests;

    // Only update profile picture URL if a new picture was uploaded
    if (req.file) {
      updateData.profilePictureUrl = profilePictureUrl;
    }

    // Update user profile
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: updateData,
      select: {
        id: true,
        username: true,
        email: true,
        firstName: true,
        lastName: true,
        PhoneNumber: true,
        profilePictureUrl: true,
        headline: true,
        location: true,
        Gender: true,
        Skills: true,
        Interests: true,
        workorProject: true,
        About: true,
        college: true,
        degree: true,
        startYear: true,
        endYear: true,
        createdAt: true,
        updatedAt: true,
        verified: true
      }
    });

    return res.status(200).json({
      message: "Profile updated successfully",
      user: updatedUser
    });

  } catch (error) {
    console.error("Error updating profile:", error);
    return next(error);
  }
};