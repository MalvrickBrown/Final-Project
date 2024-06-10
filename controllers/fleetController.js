// Connection From the Database
import { pool } from "../database/database.js";
import { getRandomHex } from "../utils/utils.js";



// Function to retrieve all Rentals from the database
export const getRentals = async (req, res, _next) =>{
    let sqlQuery = `SELECT * FROM rental_fleet`;

    const [rentals] = await pool.query(sqlQuery);

    res.status(200).json({
        status: 'success',
        result: rentals.length,
        data: { rentals: rentals }
    });
}

// Retrieves a single rental from database
export const getRental = async (req, res, _next) =>{
    let sqlQuery = `
    SELECT * FROM rental_fleet 
    WHERE id = ?`;

    const [rental] = await pool.query(sqlQuery, [req.params.id]);
    if(rental.length <= 0){
        res.status(404).json({
            status: 'error',
            message: 'Record Not found'
        });
    }else{
        res.status(200).json({
            status: 'success',
            result: rental.length,
            data: { rental: rental[0] }
        });
    }
}

// Add a rental to database
export const addToFleet = async (req, res, _next) =>{
    console.log(req.files);
    let sqlQuery = `
    INSERT INTO rental_fleet
    (make, model, type, daily_cost, weekly_cost, status, img, img2, img3, img4, img5, license_plate_nbr)
    VALUES (?,?,?,?,?,?,?,?,?,?,?,?)`

    let rFile = '';
    if(req.files){
        rFile = `${getRandomHex(8)}_${req.files.img.name}`
    }

    let rFile2 = '';
    if(req.files){
        rFile2 = `${getRandomHex(8)}_${req.files.img2.name}`
    }

    let rFile3 = '';
    if(req.files){
        rFile3 = `${getRandomHex(8)}_${req.files.img3.name}`
    }

    let rFile4 = '';
    if(req.files){
        rFile4 = `${getRandomHex(8)}_${req.files.img4.name}`
    }

    let rFile5 = '';
    if(req.files){
        rFile5 = `${getRandomHex(8)}_${req.files.img5.name}`
    }

    if(req.files){
        req.files.img.mv('./uploads/' + rFile);
        req.files.img2.mv('./uploads/' + rFile2);
        req.files.img3.mv('./uploads/' + rFile3);
        req.files.img4.mv('./uploads/' + rFile4);
        req.files.img5.mv('./uploads/' + rFile5);
    }

    const [rental] = await pool.query(sqlQuery,
    [req.body.make, req.body.model,req.body.type, req.body.daily_cost, req.body.weekly_cost, req.body.status, rFile, rFile2, rFile3, rFile4, rFile5, req.body.license_plate_nbr]
    );

    if(rental.length <= 0){
        res.status(400).json({
            status: 'error',
            message: 'Unable to Create Rental'
        });
    }else{
        res.status(201).json({
            status: 'success',
            recordId: rental.insertId
        })
    }
}

// Update Rental Information
export const updateFleet = async (req, res, _next) =>{
    // asign status a default value
    let sqlQuery = `
    UPDATE rental_fleet SET 
    make = ?, model = ?, type = ?, daily_cost = ?, weekly_cost = ?, status = ?
    WHERE id = ?`;

    const [rental] = await pool.query(sqlQuery,
    [req.body.make, req.body.model,req.body.type, req.body.daily_cost, req.body.weekly_cost, req.body.status, req.params.id]
    );

    if(rental.affectedRows <= 0){
        res.status(400).json({
            status: 'error',
            message: 'Unable To Update record'
     
        });
    }else{
    res.status(200).json({
            status: 'success',
            affectedRows:  rental.affectedRows 
        });  
    }
}

// Remove Rental from database 
export const removeRental = async(req, res, _next) =>{
    const id = req.params.id;
    let sqlQuery = `
    DELETE FROM rental_fleet 
    WHERE id = ?`;
   
const [rental] = await pool.query(sqlQuery, [id]);

    if(rental.affectedRows <= 0){
        res.status(400).json({
            status: 'error',
            message: 'Unable To Delete record'
        });
    }else{
    res.status(200).json({
            status: 'success',
            affectedRows:  rental.affectedRows 
        });  
    }
}

// Function that updates the availablitiy of a rental
export const availableRental = async(req, res,_next) => {
    
    let rental = await pool.query(`
     UPDATE rental_fleet SET status = 'not available' where id = ${req.params.id}`);

     if(rental.affectedRows <= 0){
        res.status(400).json({
            status: 'error',
            message: 'Unable To Update record'
     
        });
    }else{
    res.status(200).json({
            status: 'success',
            affectedRows:  rental.affectedRows 
        });  
    }

}
 