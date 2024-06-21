const category_model = require("../models/category.model");

// Controller for creating the category
// POST localhost:8080/ecomm/api/v1/categories

// This will have all household items

exports.createNewCategory = async (req, res) => {
    // Read the request body
    // Create the category object
    // Insert into MongoDB
    // Return the response of the created category

    const cat_data = {
        name: req.body.name,
        description: req.body.description
    };

    try {
        // Insert into MongoDB
        const category = await category_model.create(cat_data);
        return res.status(201).send(category);
    } catch (err) {
        console.log("Error while creating the category", err);
        return res.status(500).send({
            message: "Error while creating the category"
        });
    }
    // Return the response of the created category
};
