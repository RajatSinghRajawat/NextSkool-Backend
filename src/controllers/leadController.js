
const mongoose = require('mongoose');
const Lead = require('../models/Lead');

const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

//create a new lead
const createLead = async (req, res) => {
    try {
        const { fullName, email, courseInterested, source, assignedCounselor, notes, followUpDate, budget } = req.body; 
        const newLead = await Lead.create({
            fullName,
            email,
            courseInterested,
            source,
            assignedCounselor,
            notes,
            followUpDate,

            budget,
        });
        const savedLead = await newLead.save();
        res.status(201).json(savedLead);
    } catch (error) {
        res.status(500).json({ message: 'Error creating lead', error });
    }
};

//get all leads
const getLeads = async (req, res) => {
    try {
        const leads = await Lead.find().populate('assignedCounselor', 'name email');
        res.status(200).json(leads);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching leads', error });
    }
};
//get a single lead by ID
const getLeadById = async (req, res) => {
    try {
        if (!isValidObjectId(req.params.id)) {
            return res.status(400).json({ message: 'Invalid lead ID' });
        }
        const lead = await Lead.findById(req.params.id).populate('assignedCounselor', 'name email');
        if (!lead) {
            return res.status(404).json({ message: 'Lead not found' });
        }   
        res.status(200).json(lead);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching lead', error });
    }
};
//update a lead
const updateLead = async (req, res) => {
    try {
        if (!isValidObjectId(req.params.id)) {
            return res.status(400).json({ message: 'Invalid lead ID' });
        }
        const updatedLead = await Lead.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedLead) {
            return res.status(404).json({ message: 'Lead not found' });
        }
        res.status(200).json(updatedLead);
    }
        catch (error) {
        res.status(500).json({ message: 'Error updating lead', error });
    }       
};
//delete a lead
const deleteLead = async (req, res) => {
    try {
        if (!isValidObjectId(req.params.id)) {
            return res.status(400).json({ message: 'Invalid lead ID' });
        }
        const deletedLead = await Lead.findByIdAndDelete(req.params.id);
        console.log(deletedLead);
        
        if (!deletedLead) {
            return res.status(404).json({ message: 'Lead not found' });
        }
        res.status(200).json({ message: 'Lead deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting lead', error });
    }

}


module.exports = {
    createLead,
    getLeads,
    getLeadById,
    updateLead,
    deleteLead,
};

