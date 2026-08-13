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