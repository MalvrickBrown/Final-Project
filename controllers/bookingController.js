import { pool } from "../database/database.js";

// Create A Reservation For User
export const makeBooking = async (req, res, _next) => {
    let sqlQuery = `
    INSERT INTO user_reservations
    (user_id, first_name,last_name, rental_id, license_number, phone_nbr, start_date, end_date)
    VALUES (?,?,?,?,?,?,?,?)`

    const [reserved] = await pool.query(sqlQuery,
    [req.body.user_id, req.body.first_name, req.body.last_name, req.body.id, req.body.license_number, req.body.phone_nbr,req.body.start_date, req.body.end_date]
    );

    if(reserved.length <= 0){
        res.status(400).json({
            status: 'error',
            message: 'Unable to add Reservation'
        })
    }else{
        res.status(201).json({
            status: 'success',
            recordId: reserved.insertId
        })
    }
}

// View a User Reservation
export const viewRentalBooking = async (req, res, _next) =>{
    let sqlQuery = `
    SELECT * FROM user_reservations
    WHERE id = ?`;

    const [reservation] = await pool.query(sqlQuery, [req.params.id]);
    if(reservation.length <= 0){
        res.status(404).json({
            status: 'error',
            message: 'Not Found'
        });
    }else{
        res.status(200).json({
            status:'success',
            result: reservation.length,
            data: { reservation: reservation[0] }
        });
    }
}

// Get ALL USER RESERVATIONS
export const getReservations = async (req, res, _next) =>{
    let sqlQuery = `SELECT * FROM user_reservations`;

    const [reservations] = await pool.query(sqlQuery);
    
    res.status(200).json({
        status: 'success',
        result: reservations.length,
        data: { reservations: reservations }
    });
}

// UPDATE A USER RESERVATION
export const updateBooking = async (req, res, _next) =>{
    let sqlQuery = `
    UPDATE user_reservations 
    SET  start_date = ?, end_date = ?
    WHERE id = ?`;

    const [reservation] = await pool.query(sqlQuery,
    [req.body.start_date, req.body.end_date, req.params.id]
    );

    if(reservation.affectedRows <= 0){
        res.status(400).json({
            status: 'error',
            message: 'Unable To Update record'
     
        });
    }else{
    res.status(200).json({
            status: 'success',
            affectedRows:  reservation.affectedRows 
        });  
    }
}

// REMOVE A USER RESERVATION
export const removeReservation = async(req, res, _next) =>{
    const id = req.params.id;
    let sqlQuery = `
    DELETE FROM user_reservations
    WHERE id = ?`;
   
const [reservation] = await pool.query(sqlQuery, [id]);

    if(reservation.affectedRows <= 0){
        res.status(400).json({
            status: 'error',
            message: 'Unable To Delete record'
        });
    }else{
    res.status(200).json({
            status: 'success',
            affectedRows:  reservation.affectedRows 
        });  
    }
}

// INPUT DATA INTO CUSTOMER TABLE
export const autoUpdateCustomers = async(req, res, _next) =>{
    let sqlQuery =`
    INSERT INTO customers(user_id, rental_id, reservation_id)
    SELECT u.id,r.id, ur.id
    FROM users u
    inner join user_reservations ur on ur.user_id = u.id
    inner join rental_fleet r on r.id = ur.rental_id;
    `;
    const [customers] = await pool.query(sqlQuery);

    if(customers.length <= 0){
        res.status(400).json({
            status: 'error',
            message: 'Unable to add Reservation'
        })
    }else{
        res.status(201).json({
            status: 'success',
            recordId: customers.insertId
        })
    }
}