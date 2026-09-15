import { prisma } from "../config/prisma.js";

export const makeEntry = async (req, res) => {
    try {
      const {entries} = req.body
      for (const entry of entries){
        await prisma.entry.create({data: entry})
      }
      
      return res.status(200).json({message: "All entries created"})
    } catch (error) {
      console.error("Error while fabricating entry:", error);
      res.status(500).json({ error: "Server error while fabricating entry" });
    }
};

export const createEntry = async (req, res) => {
    try {
      const {newEntryContent, newEntryTitle, categoryId} = req.body;
      console.log(req.body)
      const entry = await prisma.entry.create({
        data:{
          title: newEntryTitle,
          content: newEntryContent,
          categoryId
        }
      })
      return res.status(200).json(entry)
    } catch (error) {
      console.error("Error while creating entry:", error);
      res.status(500).json({ error: "Server error while creating entry" });
    }
};

export const getEntries = async (req, res) => {
    try {
      const {id} = req.params
      const entries = await prisma.entry.findMany({
        where:{categoryId: parseInt(id)}
      });
      return res.status(200).json(entries)
    } catch (error) {
      console.error("Error while fetching entry:", error);
      res.status(500).json({ error: "Server error while fetching entries" });
    }
};

export const updateEntry = async (req, res) => {
    try {
      const id = parseInt(req.params.id)
      if (Number.isNaN(id)) {
        return res.status(400).json({ message: "Invalid entry id" })
      }
      const existing = await prisma.entry.findUnique({
        where: { id },
        include: { category: true },
      });
      if (!existing) {
        return res.status(404).json({ message: "Entry not found" })
      }
      if (existing.category && !existing.category.allowEdit) {
        return res.status(403).json({ message: "Entries in this category cannot be edited" })
      }
      const { title, content } = req.body
      if (typeof content !== "string" || !content.trim()) {
        return res.status(400).json({ message: "Content cannot be empty" })
      }
      const entry = await prisma.entry.update({
        where: { id },
        data: {
          content,
          ...(title !== undefined && { title }),
        },
      })
      return res.status(200).json(entry)
    } catch (error) {
      console.error("Error while updating entry:", error);
      res.status(500).json({ error: "Server error while updating entry" });
    }
};

export const deleteEntry = async (req, res) => {
    try {
      const id = parseInt(req.params.id)
      if (Number.isNaN(id)) {
        return res.status(400).json({ message: "Invalid entry id" })
      }
      const existing = await findEntryWithCategory(id)
      if (!existing) {
        return res.status(404).json({ message: "Entry not found" })
      }
      if (existing.category && !existing.category.allowDelete) {
        return res.status(403).json({ message: "Entries in this category cannot be deleted" })
      }
      const entry = await prisma.entry.delete({ where: { id } })
      return res.status(200).json(entry)
    } catch (error) {
      console.error("Error while deleting entry:", error);
      res.status(500).json({ error: "Server error while deleting entry" });
    }
};