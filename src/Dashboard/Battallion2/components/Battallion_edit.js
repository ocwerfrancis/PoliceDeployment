import React from 'react';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import Input from '@mui/material/Input';
import FormLabel from '@mui/material/FormLabel';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@mui/material/Paper';
// import TextField from '@material-ui/core/TextField';
// import Button from "@mui/material/Button";
// import Spinner from '../assets/home_load.gif';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import Stack from '@mui/material/Stack';
import Checkbox from '@mui/material/Checkbox';

import AutocompleteSections from './AutocompleteSections';
import AutocompleteLocations from './AutocompleteLocations';
import Alert from '../../GlobalComponents/Alert';
import Spinner from '../../../components/Spinner';

import {
  battallion_two_create,
  battallion_two_update,
  clear_messages,
  clear_errors
} from '../../../actions/battallions_create';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin: theme.spacing(2),
    '& .MuiInputBase-root': {
      marginBottom: theme.spacing(2)
    }
  },
  formLabel: {
    fontSize: '15px',
    color: 'black',
    fontWeight: '600',
    fontFamily: 'Dosis'
    // margin: theme.spacing(4),
  },
  inputSmall: {
    fontSize: '13px',
    color: '#1b1f23',
    border: '1px solid #cfd7de',
    borderRadius: '5px',
    padding: theme.spacing(1),
    // margin: theme.spacing(2),
    '&::after': {
      borderBottom: '1px solid #949494'
    }
  },
  inputSmall_: {
    fontSize: '13px',
    color: '#1b1f23',
    border: '1px solid #cfd7de',
    borderRadius: '5px',
    '& .MuiInputBase-root': {
      marginBottom: theme.spacing(0)
    },
    height: 45
    // padding: theme.spacing(1)
    // marginBottom: theme.spacing(2),
    // "&::after": {
    //     borderBottom: '1px solid #949494',
    // },
  },
  inputSmall_date: {
    fontSize: '13px',
    color: '#1b1f23',
    border: '1px solid #cfd7de',
    borderRadius: '5px',
    padding: theme.spacing(1)
    // margin: theme.spacing(2),
  },
  submit: {
    margin: theme.spacing(3, 0, 1),
    height: '56px',
    textTransform: 'none',
    fontSize: '20px!important',
    background: '#101F33',
    fontFamily: 'Dosis',
    fontWeight: 'bold',
    lineHeight: '16px',
    color: '#FFFFFF!important',
    [theme.breakpoints.up('md')]: {
      margin: theme.spacing(2, 0)
    }
  }
}));

function Battallion_edit(props) {
  const classes = useStyles();
  const { employee } = props;
  // Implementaion code

  const [first_name, setFirst_name] = React.useState(employee.first_name);
  const [last_name, setLast_name] = React.useState(employee.last_name);
  const [nin, setNin] = React.useState(employee.nin);
  const [ipps, setIpps] = React.useState(employee.ipps);
  const [file_number, setFile_number] = React.useState(employee.file_number);
  const [tin_number, setTin_number] = React.useState(employee.tin_number);
  const [account_number, setAccount_number] = React.useState(employee.account_number);
  const [bank, setBank] = React.useState(employee.bank);
  const [branch, setBranch] = React.useState(employee.branch);
  const [contact, setContact] = React.useState(employee.contact);
  const [sex, setSex] = React.useState(employee.sex);

  const [department, setDepartment] = React.useState(employee.department);
  const [section, setSection] = React.useState(employee.section);
  const [location, setLocation] = React.useState(employee.location);

  const [education_level, setEducation_level] = React.useState(employee.education_level);
  const [education_level_other, setOtherEducation_level] = React.useState(
    employee.other_education_level
  );
  const [other_education_level, setEducation_level_bool] = React.useState(
    employee.education_level === 'Other' ? false : true
  );

  const [armed, setArmed] = React.useState(employee.armed);
  const [rank, setRank] = React.useState(employee.rank);
  const [title, setTitle] = React.useState(employee.title);
  const [shift, setShift] = React.useState(employee.shift);
  const [status, setStatus] = React.useState(employee.status);

  const [date_of_enlistment, setDate_of_enlistment] = React.useState(
    new Date(employee.date_of_enlistment)
  );
  const [date_of_enlistment_data, setDate_of_enlistment_data] = React.useState(null);

  const [date_of_transfer, setDate_of_transfer] = React.useState(
    new Date(employee.date_of_transfer)
  );
  const [date_of_transfer_data, setDate_of_transfer_data] = React.useState(null);

  const [date_of_promotion, setDate_of_promotion] = React.useState(
    new Date(employee.date_of_promotion)
  );
  const [date_of_promotion_data, setDate_of_promotion_data] = React.useState(null);

  const [date_of_birth, setDate_of_birth] = React.useState(new Date(employee.date_of_birth));
  const [date_of_birth_data, setDate_of_birth_data] = React.useState(null);

  const [date_promotion_enabled, setEnable_promotion_pickers] = React.useState(
    employee.date_of_promotion === null ? true : false
  );
  const [date_pickers_enabled, setEnable_date_pickers] = React.useState(
    employee.on_leave === 'Not on leave' ? true : false
  );
  const [on_leave, setOnLeave] = React.useState(employee.on_leave);

  const [leave_start, setLeave_start] = React.useState(
    new Date(employee.on_leave !== 'Not on leave' ? employee.leave_start_date : null)
  );
  const [leave_start_data, setLeave_start_data] = React.useState(null);

  const [leave_end, setLeave_end] = React.useState(
    new Date(employee.on_leave !== 'Not on leave' ? employee.leave_end_date : null)
  );
  const [leave_end_data, setLeave_end_data] = React.useState(null);

  const [show_alert, setShow_alert] = React.useState(false);
  const [notify_leave, setNotify_leave] = React.useState(employee.notify_leave);

  const [notify_special_duty, setNotify_Special_duty] = React.useState(employee.notify_special_duty);
 
  //Special duty
  const [special_duty, setSpecial] = React.useState(employee.status === "Special duty" ? true : false);
  const [special_duty_start, setSpecialDuty_start] = React.useState(employee.special_duty_start_date === null ? new Date() : new Date(employee.special_duty_start_date));
  const [special_duty_start_data, setSpecialDuty_start_data] = React.useState(null);

  const [special_duty_end, setSpecialDuty_end] = React.useState(employee.special_duty_end_date === null ? new Date() : new Date(employee.special_duty_end_date));
  const [special_duty_end_data, setSpecialDuty_end_data] = React.useState(null);

  // eslint-disable-next-line
  const [battallion, setBattallion] = React.useState("Battalion 2");  // We already know this is Battallion 2 form

  const handle_Department_Change = (e) => {
    setDepartment(e.target.value);
  };

  const handle_Rank_Change = (e) => {
    setRank(e.target.value);
  };

  const handle_Title_Change = (e) => {
    setTitle(e.target.value);
  };

  const handle_Shift_Change = (e) => {
    setShift(e.target.value);
  };

  const handle_Status_Change = (e) => {
    setNotify_Special_duty(false)
    if(e.target.value === "Special duty"){
      setSpecial(true)
      setStatus(e.target.value);
    }else{
      setSpecial(false)
      setStatus(e.target.value);
      setSpecialDuty_start_data(null)
      setSpecialDuty_end_data(null)
    } 
  };

  const handle_education_level_change = (e) => {
    if (e.target.value === 'Other') {
      setEducation_level_bool(false);
      setEducation_level(e.target.value);
    } else {
      setEducation_level_bool(true);
      setOtherEducation_level(null);
      setEducation_level(e.target.value);
    }
  };

  const handle_other_education_level = (e) => {
    setOtherEducation_level(e.target.value);
  };

  const handle_date_of_enlistment_Change = (e) => {
    // console.log(e)
    setDate_of_enlistment(e);
    let dt = new Date(e);
    let date_object = `${dt.getFullYear()}-${dt.getMonth() + 1}-${dt.getDate()}`;
    //console.log(date_object);
    setDate_of_enlistment_data(date_object);
  };

  const handle_date_of_transfer = (e) => {
    // console.log(e)
    setDate_of_transfer(e);
    let dt = new Date(e);
    let date_object = `${dt.getFullYear()}-${dt.getMonth() + 1}-${dt.getDate()}`;
    //console.log(date_object);
    setDate_of_transfer_data(date_object);
  };

  const handle_date_of_promotion = (e) => {
    // console.log(e)
    setDate_of_promotion(e);
    let dt = new Date(e);
    let date_object = `${dt.getFullYear()}-${dt.getMonth() + 1}-${dt.getDate()}`;
    //console.log(date_object);
    setDate_of_promotion_data(date_object);
  };

  const handle_date_of_birth = (e) => {
    // console.log(e)
    setDate_of_birth(e);
    let dt = new Date(e);
    let date_object = `${dt.getFullYear()}-${dt.getMonth() + 1}-${dt.getDate()}`;
    //console.log(date_object);
    setDate_of_birth_data(date_object);
  };

  const handle_leave_start = (e) => {
    // console.log(e)
    setNotify_leave(false);
    setLeave_start(e);
    let dt = new Date(e);
    let date_object = `${dt.getFullYear()}-${dt.getMonth() + 1}-${dt.getDate()}`;
    //console.log(date_object);
    setLeave_start_data(date_object);
  };

  const handle_special_start = (e) => {
    setNotify_Special_duty(false)
    setSpecialDuty_start(e);
    let dt = new Date(e);
    let date_object = `${dt.getFullYear()}-${dt.getMonth() + 1}-${dt.getDate()}`;
    setSpecialDuty_start_data(date_object);
  };

  const handle_special_end = (e) => {
    setNotify_Special_duty(false)
    setSpecialDuty_end(e);
    let dt = new Date(e);
    let date_object = `${dt.getFullYear()}-${dt.getMonth() + 1}-${dt.getDate()}`;
    setSpecialDuty_end_data(date_object);
  };

  const handle_leave_end = (e) => {
    setNotify_leave(false);
    // console.log(e)
    setLeave_end(e);
    let dt = new Date(e);
    let date_object = `${dt.getFullYear()}-${dt.getMonth() + 1}-${dt.getDate()}`;
    console.log(date_object);
    setLeave_end_data(date_object);
  };

  const get_section_value = (section_value) => {
    console.log(section_value);
    setSection(section_value);
  };

  const get_location_value = (location_value) => {
    console.log(location_value);
    setLocation(location_value);
  };

  let leave_start_sub = null;
  let leave_end_sub = null;
  const handle_Leave_Change = (e) => {
    setNotify_leave(false);
    if (e.target.value === 'Not on leave') {
      setEnable_date_pickers(true);
      setOnLeave(e.target.value);
      leave_start_sub = null;
      leave_end_sub = null;
    } else {
      setEnable_date_pickers(false);
      setOnLeave(e.target.value);
    }
  };

  const handle_check = (e) => {
    e.preventDefault();
    if (e.target.checked) {
      setEnable_promotion_pickers(false);
    } else {
      setEnable_promotion_pickers(true);
    }
  };

  const handle_submit_data = (e) => {
    const current_date = new Date();

    let date_of_enlistment_sub;
    if (date_of_enlistment_data === null) {
      let date_object = `${date_of_enlistment.getFullYear()}-${
        date_of_enlistment.getMonth() + 1
      }-${date_of_enlistment.getDate()}`;
      date_of_enlistment_sub = date_object;
    } else {
      date_of_enlistment_sub = date_of_enlistment_data;
    }

    let date_of_transfer_sub;
    if (date_of_transfer_data === null) {
      let date_object = `${date_of_transfer.getFullYear()}-${
        date_of_transfer.getMonth() + 1
      }-${date_of_transfer.getDate()}`;
      date_of_transfer_sub = date_object;
    } else {
      date_of_transfer_sub = date_of_transfer_data;
    }

    let date_of_promotion_sub;
    // constructing date object for the user to use the current date
    if (date_of_promotion_data === null && date_promotion_enabled === false) {
      let date_object = `${date_of_promotion.getFullYear()}-${
        date_of_promotion.getMonth() + 1
      }-${date_of_promotion.getDate()}`;
      date_of_promotion_sub = date_object;
    } else {
      if (date_promotion_enabled === false) {
        date_of_promotion_sub = date_of_promotion_data;
      } else {
        date_of_promotion_sub = null;
      }
    }

    let special_start_sub = null;
    if (special_duty_start_data === null && status === "Special duty") { // user to use current date
      let date_object = `${current_date.getFullYear()}-${
        current_date.getMonth() + 1
      }-${current_date.getDate()}`;
      special_start_sub = date_object;
    } else {
      special_start_sub = special_duty_start_data;
    }
    
    let special_end_sub = null;
    if (special_duty_end_data === null && status === "Special duty") {
      let date_object = `${current_date.getFullYear()}-${
        current_date.getMonth() + 1
      }-${current_date.getDate()}`;
      special_end_sub = date_object;
    } else {
      special_end_sub = special_duty_end_data;
    }

    let date_of_birth_sub;
    if (date_of_birth_data === null) {
      let date_object = `${date_of_birth.getFullYear()}-${
        date_of_birth.getMonth() + 1
      }-${date_of_birth.getDate()}`;
      date_of_birth_sub = date_object;
    } else {
      date_of_birth_sub = date_of_birth_data;
    }

    if (leave_start_data === null && on_leave !== 'Not on leave') {
      let date_object = `${current_date.getFullYear()}-${
        current_date.getMonth() + 1
      }-${current_date.getDate()}`;
      leave_start_sub = date_object;
    } else {
      leave_start_sub = leave_start_data;
    }

    if (leave_end_data === null && on_leave !== 'Not on leave') {
      let date_object = `${current_date.getFullYear()}-${
        current_date.getMonth() + 1
      }-${current_date.getDate()}`;
      leave_end_sub = date_object;
    } else {
      leave_end_sub = leave_end_data;
    }

    const battallion_value = 'battallion_two'; // Battallion 2 form, hence we do alittle bit of hard coding

    if (
      department !== null &&
      rank !== null &&
      title !== null &&
      shift !== null &&
      status !== null &&
      on_leave !== null &&
      first_name !== null &&
      last_name !== null &&
      nin !== null &&
      ipps !== null &&
      file_number !== null &&
      // tin_number !== null &&
      // account_number !== null && // can be null
      // bank !== null && // can be null
      // branch !== null && // can be null
      // contact !== null && // can be null
      sex !== null &&
      education_level !== null &&
      armed !== null &&
      section !== null &&
      location !== null
    ) {
      props.battallion_two_update(
        employee.id,
        first_name,
        last_name,
        nin,
        ipps,
        file_number,
        tin_number,
        battallion_value,
        account_number,
        contact,
        sex,
        rank,
        education_level,
        education_level_other,
        bank,
        branch,
        department,
        title,
        status,
        shift,
        date_of_enlistment_sub,
        date_of_transfer_sub,
        date_of_promotion_sub,
        date_of_birth_sub,
        armed,
        section,
        location,
        on_leave,
        leave_start_sub,
        leave_end_sub,
        notify_leave,
        notify_special_duty,
        special_start_sub,
        special_end_sub
      );
    } else {
      setShow_alert(true);
    }
  };

  const control_bool = () => {
    setShow_alert(false);
  };

  const control_bool_api_message = () => {
    props.clear_messages();
  };

  const control_bool_error = () => {
    props.clear_errors();
  };

  const content_all_fields_required =
    'Please provide all the required information in the form before submitting.';

  return (
    <Paper elevation={0}>
      <div className={classes.root}>
        <Grid container spacing={1}>
          <Grid item md={6} xs={12} sm={6}>
            <FormLabel component="label" className={classes.formLabel}>
              First Name
            </FormLabel>
            <Input
              placeholder="First name * "
              fullWidth
              value={first_name}
              disableUnderline
              onChange={(e) => setFirst_name(e.target.value)}
              className={classes.inputSmall}
            />
          </Grid>
          <Grid item md={6} xs={12} sm={6}>
            <FormLabel component="label" className={classes.formLabel}>
              Last Name
            </FormLabel>
            <Input
              placeholder="Last name * "
              disableUnderline
              value={last_name}
              onChange={(e) => setLast_name(e.target.value)}
              className={classes.inputSmall}
              fullWidth
            />
          </Grid>
        </Grid>

        <Grid container spacing={1}>
          <Grid item md={6} xs={12} sm={6}>
            <FormLabel component="label" className={classes.formLabel}>
              NIN
            </FormLabel>
            <Input
              placeholder="Enter NIN * "
              fullWidth
              value={nin}
              onChange={(e) => setNin(e.target.value)}
              disableUnderline
              className={classes.inputSmall}
            />
          </Grid>
          <Grid item md={6} xs={12} sm={6}>
            <FormLabel component="label" className={classes.formLabel}>
              IPPS
            </FormLabel>
            <Input
              placeholder="Enter IPPS * "
              disableUnderline
              value={ipps}
              onChange={(e) => setIpps(e.target.value)}
              className={classes.inputSmall}
              fullWidth
            />
          </Grid>
        </Grid>

        <Grid container spacing={1}>
          <Grid item md={6} xs={12} sm={6}>
            <FormLabel component="label" className={classes.formLabel}>
              File number
            </FormLabel>
            <Input
              placeholder="File number * "
              fullWidth
              value={file_number}
              onChange={(e) => setFile_number(e.target.value)}
              disableUnderline
              className={classes.inputSmall}
            />
          </Grid>
          <Grid item md={6} xs={12} sm={6}>
            <FormLabel component="label" className={classes.formLabel}>
              Tin Number
            </FormLabel>
            <Input
              placeholder="Tin Number"
              disableUnderline
              value={tin_number}
              onChange={(e) => setTin_number(e.target.value)}
              className={classes.inputSmall}
              fullWidth
            />
          </Grid>
        </Grid>

        <Grid container spacing={1}>
          <Grid item md={6} xs={12} sm={6}>
            <FormLabel component="label" className={classes.formLabel}>
              Account no.
            </FormLabel>
            <Input
              placeholder="Account number"
              fullWidth
              value={account_number}
              onChange={(e) => setAccount_number(e.target.value)}
              disableUnderline
              className={classes.inputSmall}
            />
          </Grid>
          <Grid item md={6} xs={12} sm={6}>
            <FormLabel component="label" className={classes.formLabel}>
              Tel Contact
            </FormLabel>
            <Input
              placeholder="Contact"
              disableUnderline
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              className={classes.inputSmall}
              fullWidth
            />
          </Grid>
        </Grid>

        <Grid container spacing={1}>
          <Grid item md={6} xs={12} sm={6}>
            <FormLabel component="label" className={classes.formLabel}>
              Sex
            </FormLabel>
            <Select
              labelId="demo-simple-select-label"
              isableUnderline
              displayEmpty
              fullWidth
              id="demo-simple-select"
              value={sex}
              className={classes.inputSmall_}
              onChange={(e) => setSex(e.target.value)}
            >
              <MenuItem value="Male">Male</MenuItem>
              <MenuItem value="Female">Female</MenuItem>
            </Select>
          </Grid>
          <Grid item md={6} xs={12} sm={6}>
            <FormLabel component="label" className={classes.formLabel}>
              Rank
            </FormLabel>
            <Select
              labelId="demo-simple-select-label"
              isableUnderline
              displayEmpty
              fullWidth
              id="demo-simple-select"
              value={rank}
              className={classes.inputSmall_}
              onChange={handle_Rank_Change}
            >
              <MenuItem value="AIGP">AIGP</MenuItem>
              <MenuItem value="SCP">SCP</MenuItem>
              <MenuItem value="CP">CP</MenuItem>
              <MenuItem value="ACP">ACP</MenuItem>
              <MenuItem value="SSP">SSP</MenuItem>
              <MenuItem value="SP">SP</MenuItem>
              <MenuItem value="ASP">ASP</MenuItem>
              <MenuItem value="IP">IP</MenuItem>
              <MenuItem value="AIP">AIP</MenuItem>
              <MenuItem value="SGT">SGT</MenuItem>
              <MenuItem value="CPL">CPL</MenuItem>
              <MenuItem value="PC">PC</MenuItem>
              <MenuItem value="SPC">SPC</MenuItem>
            </Select>
          </Grid>
        </Grid>

        <Grid container spacing={1}>
          <Grid item md={6} xs={12} sm={6}>
            <FormLabel component="label" className={classes.formLabel}>
              Education Level
            </FormLabel>
            <Select
              labelId="demo-simple-select-label"
              isableUnderline
              displayEmpty
              fullWidth
              id="demo-simple-select"
              value={education_level}
              className={classes.inputSmall_}
              onChange={handle_education_level_change}
            >
              <MenuItem value="PLE">PLE</MenuItem>
              <MenuItem value="UCE">UCE</MenuItem>
              <MenuItem value="UACE">UACE</MenuItem>
              <MenuItem value="Diploma">Diploma</MenuItem>
              <MenuItem value="Post Graduate Diploma">Post Graduate Diploma</MenuItem>
              <MenuItem value="Bachelors">Bachelors</MenuItem>
              <MenuItem value="Masters">Masters</MenuItem>
              <MenuItem value="Doctorate">Doctorate(PhD)</MenuItem>
              <MenuItem value="Other">Other</MenuItem>
            </Select>
          </Grid>
          <Grid item md={6} xs={12} sm={6}>
            <FormLabel component="label" className={classes.formLabel}>
              Other level
            </FormLabel>
            <Input
              placeholder="Enter your other education level / cerification"
              disableUnderline
              disabled={other_education_level}
              value={education_level_other}
              onChange={handle_other_education_level}
              className={classes.inputSmall}
              fullWidth
            />
          </Grid>
        </Grid>

        <Grid container spacing={1}>
          <Grid item md={6} xs={12} sm={6}>
            <FormLabel component="label" className={classes.formLabel}>
              Bank
            </FormLabel>
            {/*<Input
                    placeholder="Enter bank"
                    disableUnderline
                    value={bank}
                    onChange={(e) => setBank(e.target.value)}
                    className={classes.inputSmall}
                    fullWidth
                  />*/}
            <Select
              labelId="demo-simple-select-label"
              isableUnderline
              displayEmpty
              fullWidth
              id="demo-simple-select"
              value={bank}
              className={classes.inputSmall_}
              onChange={(e) => setBank(e.target.value)}
            >
              <MenuItem value="CENTENARY">CENTENARY</MenuItem>
              <MenuItem value="STANBIC">STANBIC</MenuItem>
              <MenuItem value="ABSA/BARCLAYS">ABSA/BARCLAYS</MenuItem>
              <MenuItem value="DFCU">DFCU</MenuItem>
              <MenuItem value="EQUITY">EQUITY</MenuItem>
              <MenuItem value="HOUSING FIN">HOUSING FIN</MenuItem>
              <MenuItem value="STANDARD CHARTERED">STANDARD CHARTERED</MenuItem>
              <MenuItem value="PRIDE">PRIDE</MenuItem>
              <MenuItem value="FINCA">FINCA</MenuItem>
              <MenuItem value="POST">POST</MenuItem>
              <MenuItem value="BOA">BOA</MenuItem>
              <MenuItem value="EXIM">EXIM</MenuItem>
              <MenuItem value="BARODA">BARODA</MenuItem>
              <MenuItem value="ORIENT">ORIENT</MenuItem>
              <MenuItem value="UBA">UBA</MenuItem>
              <MenuItem value="DIAMOND TRUST">DIAMOND TRUST</MenuItem>
            </Select>
          </Grid>
          <Grid item md={6} xs={12} sm={6}>
            <FormLabel component="label" className={classes.formLabel}>
              Branch
            </FormLabel>
            <Input
              placeholder="Enter bank branch"
              fullWidth
              value={branch}
              onChange={(e) => setBranch(e.target.value)}
              disableUnderline
              className={classes.inputSmall}
            />
          </Grid>
        </Grid>

        <Grid container spacing={1}>
          {/*NOTE: These departments are specific to Battallion 2 */}
          <Grid item md={6} xs={12} sm={6}>
            <FormLabel component="label" className={classes.formLabel}>
              Department
            </FormLabel>
            <Select
              labelId="demo-simple-select-label"
              isableUnderline
              displayEmpty
              fullWidth
              id="demo-simple-select"
              value={department}
              className={classes.inputSmall_}
              onChange={handle_Department_Change}
            >
              <MenuItem value="Embassy">Embassy</MenuItem>
              <MenuItem value="Consulate">Consulate</MenuItem>
              <MenuItem value="High commission">High Commission</MenuItem>
              <MenuItem value="Other diplomats">Other diplomats</MenuItem>
              <MenuItem value="Administration">Administration</MenuItem>
            </Select>
          </Grid>

          <Grid item md={6} xs={12} sm={6}>
            <FormLabel component="label" className={classes.formLabel}>
              Title
            </FormLabel>
            <Select
              labelId="demo-simple-select-label"
              isableUnderline
              displayEmpty
              fullWidth
              id="demo-simple-select"
              value={title}
              className={classes.inputSmall_}
              onChange={handle_Title_Change}
            >
              <MenuItem value="Commandant">Commandant</MenuItem>
              <MenuItem value="Deputy commandant">Deputy Commandant</MenuItem>
              <MenuItem value="Staff officer">Staff Officer</MenuItem>
              <MenuItem value="Head of operations">Head of Operations</MenuItem>
              <MenuItem value="Head of armoury">Head of Armoury</MenuItem>
              <MenuItem value="Supervisor">Supervisor</MenuItem>
              <MenuItem value="In Charge">In Charge</MenuItem>
              <MenuItem value="2nd In Charge">2nd In charge</MenuItem>
              <MenuItem value="Driver">Driver</MenuItem>
              <MenuItem value="N/A">N/A</MenuItem>
            </Select>
          </Grid>
        </Grid>

        <Grid container spacing={1}>
          <Grid item md={6} xs={12} sm={6}>
            <FormLabel component="label" className={classes.formLabel}>
              Status
            </FormLabel>
            <Select
              labelId="demo-simple-select-label"
              isableUnderline
              displayEmpty
              fullWidth
              id="demo-simple-select"
              value={status}
              className={classes.inputSmall_}
              onChange={handle_Status_Change}
            >
              <MenuItem value="Active">Active</MenuItem>
              <MenuItem value="Absent">Absent(AWOL)</MenuItem>
              <MenuItem value="Transfered">Transfered</MenuItem>
              <MenuItem value="Sick">Sick</MenuItem>
              <MenuItem value="Dead">Dead</MenuItem>
              <MenuItem value="Suspended">Suspended</MenuItem>
              <MenuItem value="Dismissed">Dismissed</MenuItem>
              <MenuItem value="In court">In court(Displinary/criminal)</MenuItem>
              <MenuItem value="Deserted">Deserted</MenuItem>
              <MenuItem value="On course">On course</MenuItem>
              <MenuItem value="On mission">On mission</MenuItem>
              <MenuItem value="On leave">On leave</MenuItem>
              <MenuItem value="Interdiction">Interdiction</MenuItem>
              <MenuItem value="Criminal court">Criminal court(remand / bail)</MenuItem>
              <MenuItem value="Displinary court">Displinary court</MenuItem>
              <MenuItem value="Special duty">Special duty</MenuItem>
              <MenuItem value="On police course">On police course</MenuItem>
            </Select>
          </Grid>
          <Grid item md={6} xs={12} sm={6}>
            <FormLabel component="label" className={classes.formLabel}>
              Shift
            </FormLabel>
            <Select
              labelId="demo-simple-select-label"
              isableUnderline
              displayEmpty
              fullWidth
              id="demo-simple-select"
              value={shift}
              className={classes.inputSmall_}
              onChange={handle_Shift_Change}
            >
              <MenuItem value="Day">Day</MenuItem>
              <MenuItem value="Night">Night</MenuItem>
              <MenuItem value="Long night">Long night</MenuItem>
              <MenuItem value="None">None(not applicable)</MenuItem>
            </Select>
          </Grid>
        </Grid>
        {
          special_duty ? (
              <Grid container spacing={1}>
                  <Grid item md={6} xs={12} sm={6}>
                    <FormLabel component="label" className={classes.formLabel}>
                      Special duty start date
                    </FormLabel>
                    <Stack spacing={6}>
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DesktopDatePicker
                          inputFormat="MM/dd/yyyy"
                          value={special_duty_start}
                          onChange={handle_special_start}
                          className={classes.inputSmall_date}
                          renderInput={(params) => <TextField {...params} />}
                        />
                      </LocalizationProvider>
                    </Stack>
                 </Grid>
                 <Grid item md={6} xs={12} sm={6}>
                    <FormLabel component="label" className={classes.formLabel}>
                      Special duty end date
                    </FormLabel>
                    <Stack spacing={6}>
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DesktopDatePicker
                          inputFormat="MM/dd/yyyy"
                          value={special_duty_end}
                          onChange={handle_special_end}
                          className={classes.inputSmall_date}
                          renderInput={(params) => <TextField {...params} />}
                        />
                      </LocalizationProvider>
                    </Stack>
                 </Grid>
              </Grid>
            ) : null
        }

        <Grid container spacing={1}>
          <Grid item md={6} xs={12} sm={6}>
            <FormLabel component="label" className={classes.formLabel}>
              Date of enlistment
            </FormLabel>
            <Stack spacing={6}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DesktopDatePicker
                  // label="Date desktop"
                  inputFormat="MM/dd/yyyy"
                  value={date_of_enlistment}
                  onChange={handle_date_of_enlistment_Change}
                  className={classes.inputSmall_date}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </Stack>
          </Grid>
          <Grid item md={6} xs={12} sm={6}>
            <FormLabel component="label" className={classes.formLabel}>
              Date of transfer
            </FormLabel>
            <Stack spacing={6}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DesktopDatePicker
                  // label="Date desktop"
                  inputFormat="MM/dd/yyyy"
                  value={date_of_transfer}
                  onChange={handle_date_of_transfer}
                  className={classes.inputSmall_date}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </Stack>
          </Grid>
        </Grid>

        <Grid container spacing={1}>
          <Grid item md={6} xs={12} sm={6}>
            <FormLabel component="label" className={classes.formLabel}>
              Date of birth
            </FormLabel>
            <Stack spacing={6}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DesktopDatePicker
                  // label="Date desktop"
                  inputFormat="MM/dd/yyyy"
                  value={date_of_birth}
                  onChange={handle_date_of_birth}
                  className={classes.inputSmall_date}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </Stack>
          </Grid>
          <Grid item md={6} xs={12} sm={6}>
            <FormLabel component="label" className={classes.formLabel}>
              Armed
            </FormLabel>
            <Select
              labelId="demo-simple-select-label"
              isableUnderline
              displayEmpty
              fullWidth
              id="demo-simple-select"
              value={armed}
              className={classes.inputSmall_}
              onChange={(e) => setArmed(e.target.value)}
            >
              <MenuItem value="Yes">Yes</MenuItem>
              <MenuItem value="No">No</MenuItem>
            </Select>
          </Grid>
        </Grid>

        <Grid container spacing={1}>
          <Grid item md={12} xs={12} sm={12}>
            <FormLabel component="label" className={classes.formLabel}>
              Date of promotion
              <span>
                {employee.date_of_promotion === null ? (
                  <span>(Check/tick if employee has been promoted before)</span>
                ) : null}
              </span>
            </FormLabel>
            {employee.date_of_promotion === null ? (
              <Checkbox onChange={handle_check} {...label} />
            ) : null}
            <Stack spacing={6}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DesktopDatePicker
                  // label="Date desktop"
                  disabled={date_promotion_enabled}
                  inputFormat="MM/dd/yyyy"
                  value={date_of_promotion}
                  onChange={handle_date_of_promotion}
                  className={classes.inputSmall_date}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </Stack>
          </Grid>
        </Grid>

        <Grid container spacing={1}>
          <Grid item md={6} xs={12} sm={6}>
            <FormLabel component="label" className={classes.formLabel}>
              Section
            </FormLabel>
            {/*<Input
                    placeholder="Location"
                    disableUnderline
                    // value={l_name}
                    className={classes.inputSmall}
                    fullWidth
                  />*/}
            <AutocompleteSections default_value={section} get_section_value={get_section_value} />
          </Grid>
          <Grid item md={6} xs={12} sm={6}>
            <FormLabel component="label" className={classes.formLabel}>
              Location
            </FormLabel>
            {/*<Input
                    placeholder="Location"
                    disableUnderline
                    // value={l_name}
                    className={classes.inputSmall}
                    fullWidth
                  />*/}
            <AutocompleteLocations
              default_value={location}
              get_section_value={get_location_value}
            />
          </Grid>
        </Grid>

        <Grid container spacing={1}>
          <Grid item md={4} xs={12} sm={12}>
            <FormLabel component="label" className={classes.formLabel}>
              On leave
            </FormLabel>
            <Select
              labelId="demo-simple-select-label"
              isableUnderline
              displayEmpty
              fullWidth
              id="demo-simple-select"
              value={on_leave}
              className={classes.inputSmall_}
              onChange={handle_Leave_Change}
            >
              <MenuItem value="Pass leave">Pass leave</MenuItem>
              <MenuItem value="Maternity leave">Maternity leave</MenuItem>
              <MenuItem value="Sick leave">Sick leave</MenuItem>
              <MenuItem value="Study leave">Study leave</MenuItem>
              <MenuItem value="Annual leave">Annual leave</MenuItem>
              <MenuItem value="Not on leave">Not on leave</MenuItem>
            </Select>
          </Grid>
          <Grid item md={4} xs={12} sm={12}>
            <FormLabel component="label" className={classes.formLabel}>
              Leave start date
            </FormLabel>
            <Stack spacing={6}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DesktopDatePicker
                  // label="Date desktop"
                  disabled={date_pickers_enabled}
                  inputFormat="MM/dd/yyyy"
                  value={leave_start}
                  onChange={handle_leave_start}
                  className={classes.inputSmall_date}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </Stack>
          </Grid>
          <Grid item md={4} xs={12} sm={12}>
            <FormLabel component="label" className={classes.formLabel}>
              Leave end date
            </FormLabel>
            <Stack spacing={6}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DesktopDatePicker
                  // label="Date desktop"
                  disabled={date_pickers_enabled}
                  inputFormat="MM/dd/yyyy"
                  value={leave_end}
                  onChange={handle_leave_end}
                  className={classes.inputSmall_date}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </Stack>
          </Grid>

          <Grid item md={12} xs={12} sm={12}>
            {show_alert === true ? (
              <Alert
                content={content_all_fields_required}
                control_bool={control_bool}
                status="error"
              />
            ) : null}
            {props.messages.api_message !== null &&
            props.messages.message_type === 'battallion_employee_created' ? (
              <Alert
                content={props.messages.api_message}
                control_bool={control_bool_api_message}
                status="success"
              />
            ) : null}
            {props.error.msg !== null && props.error.msg.file_number ? (
              <Alert
                content={
                  'File number already taken, please make sure you are providing the correct file number.'
                }
                control_bool={control_bool_error}
                status="error"
              />
            ) : null}
          </Grid>

          <Grid item md={12} xs={12} sm={12}>
            <Stack spacing={6}>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={handle_submit_data}
              >
                {props.loading === true ? <Spinner /> : 'Submit data'}
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </div>
    </Paper>
  );
}

const mapStateToProps = (state) => ({
  messages: state.messages,
  auth: state.auth,
  error: state.errors,
  loading: state.battallions_create.create_battallion_two_loading
});

export default connect(mapStateToProps, {
  battallion_two_create,
  clear_messages,
  clear_errors,
  battallion_two_update
})(Battallion_edit);
