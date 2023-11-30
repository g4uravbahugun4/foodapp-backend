const express = require("express");
const router = express.Router();
const Restauramt = require("../model/restaurantModel");

//add new restaurant with name, dishes and city
router.post("/add-restaurant", async (req, res) => {
    try {
        const { name,dishes,city } = req.body;
        let restaurant=new Restauramt({name,dishes,city})
        await restaurant.save()
        return res.status(200).json({"Restaurant Added":restaurant})
    } catch (error) {
        console.error(error);
        return res.status(500).send(`Server error`);
    }
});

//delete restaurant
router.delete("/delete-restaurant/:id", async (req, res) => {
    try {
        const { id } = req.params;

      
        let restaurantToDelete = await Restauramt.findById(id);

        if (!restaurantToDelete) {
            return res.status(404).json({ error: "Restaurant Not Found" });
        }

      
        restaurantToDelete = await Restauramt.findByIdAndDelete(id);

        return res.status(200).json({ "Deleted Restaurant": restaurantToDelete });
    } catch (error) {
        console.error(error);
        return res.status(500).send(`Server error`);
    }
});

//edit the restauarant name and dishes , NOT city
router.put("/edit-restaurant/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { name, dishes } = req.body;

        const updatedRestaurant = await Restauramt.findByIdAndUpdate(
            id,
            { $set: { name, dishes } }, 
            { new: true, runValidators: true }
        );

        if (!updatedRestaurant) {
            return res.status(404).json({ error: "Restaurant Not Found" });
        }

        return res.status(200).json({ message: "Restaurant updated successfully", restaurant: updatedRestaurant });
    } catch (error) {
        console.error(error);
        return res.status(500).send('Server error');
    }
});

//get all the dishes of a particular restaurant

router.get("/restaurant/:id/dishes", async (req, res) => {
    try {
        const { id } = req.params; 
        const restaurant = await Restauramt.findById(id); 

        if (!restaurant) {
            return res.status(404).json({ error: "Restaurant Not Found" });
        }

        const dishes = restaurant.dishes;
        return res.status(200).json({ Dishes: dishes }); 
    } catch (error) {
        console.error(error);
        return res.status(500).send('Server error');
    }
});


module.exports = router;