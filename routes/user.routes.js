import express from 'express';
import bcrypt from 'bcryptjs';
import {User, Pupil} from '../models/user.model.js';

const userRoutes = express.Router();

userRoutes.post('/register', async (req, res) => {
    const { password, email, fullname, leaderEmail, role } = req.body;
    
    console.log(req.body);

    try {
        const passwordHash = await bcrypt.hash(password, 10);

        if(role === 'pupil') {
            const leader = await User.findOne({ email: leaderEmail }, { password: 0 });

            if (!leader) return res.status(404).json({ message: 'Leader not found' });
            if (leader.role !== 'leader') return res.status(403).json({ message: "Leader doesn't exsist or incorrect email!" });

            const user = new Pupil({ password: passwordHash, fullname, email, role, leader: leader.email });
            await user.save();

            console.log('Pupil registered successfully');
        }
        
        const user = new User({ password: passwordHash, email, role, fullname });
        console.log('User registered successfully');
        await user.save();
        res.status(201).json(user);
    } catch(err) {
        return res.status(500).json({ message: err.message });
    }
})

userRoutes.get('/', async (req, res) => {
    try {
        const users = await User.find();
        const pupils = await Pupil.find();
        res.status(200).json([users, pupils]);
    } catch(err) {
        res.status(500).json({ message: err.message });
    }
})

export default userRoutes;