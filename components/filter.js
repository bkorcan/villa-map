import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import VillaIcon from '@mui/icons-material/Villa';
import Divider from '@mui/material/Divider';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Style from '../styles/home.module.css'
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { useStore } from '../components/state_day'
import format from 'date-fns/format';
import { useRouter } from 'next/router'



function Filter() {
    // Number  Of People
    const [guests, setGuests] = React.useState(2);

    const handleChangeGuests = (event) => {
        setGuests(event.target.value);
    };
    // Date_picker
    const moveRight = useStore(state => state.moveRight)
    const setMoveRight = useStore(state => state.setMoveRight)
    const show = useStore(state => state.show)
    const setShow = useStore(state => state.setShow)
    const checkInText = useStore(state => state.checkInText)
    const setCheckInText = useStore(state => state.setCheckInText)
    const checkOutText = useStore(state => state.checkOutText)
    const setCheckOutText = useStore(state => state.setCheckOutText)
    const focus = useStore(state => state.focus)
    const setFocus = useStore(state => state.setFocus)
    const disabled = useStore(state => state.disabled)
    const setDisabled = useStore(state => state.setDisabled)
    //   
    const dayClicked = (day) => {
        if (!focus) {
            setCheckInText(format(day, 'dd MMM yy'));
            setMoveRight(true);
            setFocus(true);
            setDisabled({ before: day })
        } else {
            setCheckOutText(format(day, 'dd MMM yy'));
            setShow('none')
            setFocus(false)
            setMoveRight(false);
            setDisabled({ before: new Date() })
        }
    }
    // Routing
    const router = useRouter()
    const [town, setTown] = React.useState('')
    const [currency, setCurrency] = React.useState('USD')
    const [minPrice, setMinPrice] = React.useState(0)
    const [maxPrice, setMaxPrice] = React.useState(0)
    const [showSubmit, setShowSubmit] = React.useState(false)

    return (
        <Box
            sx={{
                width: 600,
                margin: "auto",
                padding: 10,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                border: '1px solid #ccc',
                position: 'relative',
                zIndex: 100,
                height: '100vh',
            }}
        >
            <Avatar sx={{ bgcolor: 'secondary.main', marginTop: -6 }}>
                <VillaIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                Holiday Villas
            </Typography>
            <Typography color='secondary' style={{ width: '100%', textAlign: 'left', fontSize: 20, marginTop: 41 }}>
                Select A Region
            </Typography>
            <Typography color='error' style={{ width: '100%', fontSize: 14, textAlign: 'left', marginBottom: -22, marginTop: -1 }}>
                *Required
            </Typography>
            <Box component="form" noValidate sx={{ mt: 1 }}>
                <FormControl >
                    <RadioGroup row
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue="USD"
                        name="radio-buttons-group"
                        onChange={(e) => {
                            setTown(e.target.value); setShowSubmit(true)
                        }}
                    >
                        <FormControlLabel value="gocek" control={<Radio />} label="Gocek" />
                        <FormControlLabel value="kas" control={<Radio />} label="Kas" />
                        <FormControlLabel value="kalkan" control={<Radio />} label="Kalkan" />
                    </RadioGroup>
                </FormControl>
                <Divider />

                {/* Day Container */}
                {/* Dates */}
                <Typography color='secondary' style={{ width: '100%', textAlign: 'left', fontSize: 20, marginTop: 30 }}>
                    Choose Dates
                </Typography>
                {/* End Of Dates */}
                <div  style={{ position:'relative'}} >
                    <TextField margin="normal" name="CheckIn" value={checkInText} autoComplete="off" label="Check In" type="text" id="check_in" style={{ width: '45%', marginRight: '5%' }}
                        onClick={() => { setDisabled(disabled); setShow('block'); }}

                    />
                    <TextField margin="normal" name="CheckOut" value={checkOutText} label="Check Out" type="text" id="check_out" style={{ width: '45%' }}
                        focused={focus}
                    />
                    <div  style={{ left: moveRight ? 100 : 0, display: show , 
                        position:'absolute', 
                        backgroundColor:'#fff',
                        border:'1px solid #ccc',
                        top:72,
                        zIndex:6
                        }} >
                        <DayPicker
                            onDayClick={dayClicked}
                            disabled={disabled}
                        />
                    </div>
                </div>
                {/* End Of day Container */}
                {/* Number Of People */}
                <Typography color='secondary' style={{ width: '100%', textAlign: 'left', fontSize: 20, marginTop: 15 }}>
                    Number Of  <span style={{ color: 'black' }}> Adults + Kids </span> (age 2 and up)
                </Typography>
                <Box sx={{ minWidth: 120, marginTop:3 }}>
                    <FormControl style={{ width: 90, marginTop: -20 }}>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={guests}
                            onChange={handleChangeGuests}
                            defaultValue={1}

                        >
                            <MenuItem value={1}>1</MenuItem>
                            <MenuItem value={2}>2</MenuItem>
                            <MenuItem value={3}>3</MenuItem>
                            <MenuItem value={4}>4</MenuItem>
                            <MenuItem value={5}>5</MenuItem>
                            <MenuItem value={6}>6</MenuItem>
                            <MenuItem value={7}>7</MenuItem>
                            <MenuItem value={8}>8</MenuItem>
                            <MenuItem value={9}>9</MenuItem>
                            <MenuItem value={10}>10</MenuItem>
                            <MenuItem value={11}>11</MenuItem>
                            <MenuItem value={12}>12</MenuItem>
                            <MenuItem value={13}>13</MenuItem>
                            <MenuItem value={14}>14</MenuItem>
                            <MenuItem value={15}>15</MenuItem>
                            <MenuItem value={100}>16+</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
                <Divider style={{ marginTop: 10 }} />

                {/* Price */}
                <Typography color='secondary' style={{ width: '100%', textAlign: 'left', fontSize: 20, marginTop: 30 }}>
                    Price
                </Typography>

                {/* Price Currency */}
                <FormControl >
                    <RadioGroup row
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue="USD"
                        name="radio-buttons-group"
                        onChange={(e) => setCurrency(e.target.value)}
                    >
                        <FormControlLabel value="USD" control={<Radio />} label="USD" />
                        <FormControlLabel value="TL" control={<Radio />} label="TL" />
                    </RadioGroup>
                </FormControl>

                {/* Price value */}
                <TextField onChange={(e) => setMinPrice(e.target.value)}
                    id="standard-basic1" label="min" type='number' variant="standard" style={{ width: 90, marginRight: 40, marginTop: -15, marginLeft: 30 }} />
                <TextField onChange={(e) => setMaxPrice(e.target.value)}
                    id="standard-basic2" label="max" type='number' variant="standard" style={{ width: 90, marginBottom: 70, marginTop: -15, }} />
                <Divider style={{ marginTop: 0 }} />
                {/* Price */}
                <Button disabled
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    style={{ paddingTop: 5, paddingBottom: 5, fontSize: 25, backgroundColor: 'purple', display: showSubmit ? 'none' : 'block' }}
                >
                    Apply
                </Button>

                <Button
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    style={{ paddingTop: 5, paddingBottom: 5, fontSize: 20, backgroundColor: 'purple', display: showSubmit ? 'block' : 'none' }}
                    onClick={() => {
                        // const {t, ci, co, g, minp, maxp } = router.query
                        router.push(`/map?t=${town}&ci=${checkInText.replace(/ /g, '')}&co=${checkOutText.replace(/ /g, '')}&g=${guests}&minp=${minPrice}&maxp=${maxPrice}`)
                    }}

                >
                    Apply
                </Button>

            </Box>
        </Box>
    );
}

export { Filter }