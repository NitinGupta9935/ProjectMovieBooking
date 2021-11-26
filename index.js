const { request } = require('express');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

mongoose.connect('mongodb://localhost/Movie-Booking')
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Could not connect to Database!!!', err));

const seatSchema = new mongoose.Schema({
    seatName: String,
    mobileNumber: Number,
    isBooked: Boolean
});

const Seats = mongoose.model('Seats', seatSchema);

async function createSeat(seat_name, mobile_number){
    const seat = new Seats({
        seatName: seat_name,
        mobileNumber: mobile_number, 
        isBooked: false
    });
    
    const result = await seat.save();
    console.log(result);
}

function createSeats(){
    for(let i = 0; i < 7; i++)
    for(let j = 1; j < 7; j++){
        if(i % 7 == 1)
        createSeat('a' + j, 0000);
        if(i % 7 == 2)
        createSeat('b' + j, 9900);
        if(i % 7 == 3)
        createSeat('c' + j, 9900);
        if(i % 7 == 4)
        createSeat('d' + j, 9900);
        if(i % 7 == 5)
        createSeat('e' + j, 9900);
        if(i % 7 == 0)
        createSeat('f' + j, 9900);
    }
}   
// createSeats();
    
    
async function getSeats(){
return await Seats.find();
}

async function runGetSeats(){
    let avariableSeats = [];
    try{
        const seats = await getSeats();
        let count = 0;
    // seats[0]["seatName"]
    for(let i = 0; i < 36; i++){
        if(seats[i]["isBooked"] == false){
            avariableSeats.push(seats[i]["seatName"]);
            //        console.log(seats[i]["seatName"]);
            count++;
        }
    }
}
catch(error){
    console.log("error "+ error.message);
}
return avariableSeats;

//console.log(seats[29]["seatName"], count);
//res.redirect('/Booking');
}
// runGetSeats();


app.set('view engine', 'ejs');
app.set('views', './views');

// app.use(express.json());
app.use(bodyParser.urlencoded({extended: false}));



app.get('/', async (req, res) => {
    
    // const params = {"a1": "Avariable", "a2": "Avariable", "a3": "Avariable"};
    // res.render('index', params); 

    try{
       await runGetSeats();
    //    console.log(avariableSeats);
        res.render('in',await params());
    }
    catch(error) {
         console.log("error in get=> " + error.message)
    }
});

async function updateBooking(seat_name, mobile_number){
    try{
    const result = await Seats.updateOne({ seatName: seat_name }, {
        $set:{
            mobileNumber: mobile_number,
            isBooked: true
        }
    });
    console.log("Booked");
    }
    catch(err) {
        console.log("error " + err.message);
    }
}


app.post('/book', async (req, res) => {
    console.log(req.body.seatName);
    //res.redirect('/');

    await updateBooking(req.body.seatName, req.body.mobileNumber);

    // avariableSeats = null;
    // await runGetSeats();
    // updateBooking("a6", "4561");
   await res.redirect("/");
});



async function params(){
    let avariableSeats = await runGetSeats();
    // console.log(avariableSeats);
    return {
        "a1": (avariableSeats.includes("a1")? "Avariable":"Booked"),
        "a2": (avariableSeats.includes("a2")? "Avariable":"Booked"),
        "a3": (avariableSeats.includes("a3")? "Avariable":"Booked"),
        "a4": (avariableSeats.includes("a4")? "Avariable":"Booked"),
        "a5": (avariableSeats.includes("a5")? "Avariable":"Booked"),
        "a6": (avariableSeats.includes("a6")? "Avariable":"Booked"),

        "b1": (avariableSeats.includes("b1")? "Avariable":"Booked"),
        "b2": (avariableSeats.includes("b2")? "Avariable":"Booked"),
        "b3": (avariableSeats.includes("b3")? "Avariable":"Booked"),
        "b4": (avariableSeats.includes("b4")? "Avariable":"Booked"),
        "b5": (avariableSeats.includes("b5")? "Avariable":"Booked"),
        "b6": (avariableSeats.includes("b6")? "Avariable":"Booked"),
        
        "c1": (avariableSeats.includes("c1")? "Avariable":"Booked"),
        "c2": (avariableSeats.includes("c2")? "Avariable":"Booked"),
        "c3": (avariableSeats.includes("c3")? "Avariable":"Booked"),
        "c4": (avariableSeats.includes("c4")? "Avariable":"Booked"),
        "c5": (avariableSeats.includes("c5")? "Avariable":"Booked"),
        "c6": (avariableSeats.includes("c6")? "Avariable":"Booked"),
        
        "d1": (avariableSeats.includes("d1")? "Avariable":"Booked"),
        "d2": (avariableSeats.includes("d2")? "Avariable":"Booked"),
        "d3": (avariableSeats.includes("d3")? "Avariable":"Booked"),
        "d4": (avariableSeats.includes("d4")? "Avariable":"Booked"),
        "d5": (avariableSeats.includes("d5")? "Avariable":"Booked"),
        "d6": (avariableSeats.includes("d6")? "Avariable":"Booked"),
        
        "e1": (avariableSeats.includes("e1")? "Avariable":"Booked"),
        "e2": (avariableSeats.includes("e2")? "Avariable":"Booked"),
        "e3": (avariableSeats.includes("e3")? "Avariable":"Booked"),
        "e4": (avariableSeats.includes("e4")? "Avariable":"Booked"),
        "e5": (avariableSeats.includes("e5")? "Avariable":"Booked"),
        "e6": (avariableSeats.includes("e6")? "Avariable":"Booked"),

        "f1": (avariableSeats.includes("f1")? "Avariable":"Booked"),
        "f2": (avariableSeats.includes("f2")? "Avariable":"Booked"),
        "f3": (avariableSeats.includes("f3")? "Avariable":"Booked"),
        "f4": (avariableSeats.includes("f4")? "Avariable":"Booked"),
        "f5": (avariableSeats.includes("f5")? "Avariable":"Booked"),
        "f6": (avariableSeats.includes("f6")? "Avariable":"Booked")
    }
}   
    
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

