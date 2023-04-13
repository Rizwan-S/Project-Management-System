import Project from "../models/project/project.js";
import User from "../models/user/user.js";
import mongoose from "mongoose";

export const getProjects = async (req,res) => {
    try {
        const projects = await Project.find();
        res.status(200).json(projects);
    }
    catch (error) {
        res.status(404).json( { message: error } );
    }
};

export const addProject = async (req,res) => {
    try {
        const project = req.body;
        const newProject = new Project({ ...project, creator: req.userId });
        newProject.creator = req.userId;
        await newProject.save();
        res.status(201).json(newProject);
    }
    catch (error) {
        res.status(409).json({ message: error });
    }
};

export const deleteProject = async (req,res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).send("No project with that id!");
    await Project.findByIdAndDelete(id);
    res.json({ message: "Project deleted successfully." });
};

export const updateProject = async (req, res) => {
    const { id: _id } = req.params;
    const project = req.body;
  
    if (!mongoose.Types.ObjectId.isValid(_id))
      return res.status(404).send("No project with that id!");
  
    const updatedProject = await Project.findByIdAndUpdate(_id, project, {
      new: true,
    });
    res.json(updatedProject);
  };

  export const getProjectsBySearch = async (req, res) => {
    const { searchQuery } = req.query;
  
    try {
      const title = new RegExp(searchQuery, "i");
      const projects = await Project.find({ $or: [{ title }, { domain: title }] });
      res.status(200).json({ data: projects });
    } catch (error) {
      res.status(404).json({ message: error });
    }
  };

  export const applyToProject = async (req, res) => {
    const { id } = req.params;
  
    if (!req.userId) return res.json({ message: "Unauthenticated" });
  
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send("No project with that id!");
  
    const project = await Project.findById(id);

    const user = await User.findById(req.userId);
  
    const index = project.candidatesInterested.findIndex((email) => email === String(user.email));
    
    if (index === -1) {
      project.candidatesInterested.push(user.email);
    } else {
      project.candidatesInterested = project.candidatesInterested.filter((email) => email !== String(user.email));
    }
  
    const updatedProject = await Project.findByIdAndUpdate(
      id,
      project,
      { new: true }
    );
    res.json(updatedProject);
  };

  export const selectCandidate = async (req, res) => {
    const { candidateEmail, projectId } = req.query;

    if (!mongoose.Types.ObjectId.isValid(projectId))
      return res.status(404).send("No project with that id!");
    
    const project = await Project.findById(projectId);
    
    const index = project.candidatesInterested
                  .findIndex((email) => email === String(candidateEmail));
    
    if (index !== -1) {
      project.candidatesInterested = project.candidatesInterested
                                    .filter((email) => email !== String(candidateEmail));
      const isPresentAlready = project.members
                              .findIndex((email) => email === candidateEmail);
      
      if (isPresentAlready === -1) {
        project.members.push(candidateEmail);
      }
    }
    
    const updatedProject = await Project.findByIdAndUpdate(projectId, project, { new: true });
    res.json(updatedProject);
  };