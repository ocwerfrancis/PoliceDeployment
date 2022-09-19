import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormLabel from '@mui/material/FormLabel';
import { connect } from 'react-redux';
import { Box, Container, Grid } from '@mui/material';
// import { SummaryItem } from '../../GlobalComponents/summary-item';
import { Summary } from './summary';
import HouseSidingIcon from '@mui/icons-material/HouseSiding';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import FlagIcon from '@mui/icons-material/Flag';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import AccountBoxIcon from '@mui/icons-material/AccountBox';

const useStyles = makeStyles((theme) => ({
  formLabel: {
    fontSize: '18px',
    color: 'black',
    fontWeight: '600',
    fontFamily: 'Dosis'
  }
}));
function Content_Dashboard(props) {
  const classes = useStyles();

  let stats;
  props.overrall_data !== null
    ? (stats = [
        {
          content:
            props.overrall_data.embassy === undefined ? '' : `${props.overrall_data.embassy}`,
          icon: AccountBalanceIcon,
          label: 'Embassy'
        },
        {
          content:
            props.overrall_data.consolate === undefined ? '' : `${props.overrall_data.consolate}`,
          icon: HouseSidingIcon,
          label: 'Consulate'
        },
        {
          content:
            props.overrall_data.high_commission === undefined
              ? ''
              : `${props.overrall_data.high_commission}`,
          icon: FlagIcon,
          label: 'High Commission'
        },
        {
          content:
            props.overrall_data.other_diplomats === undefined
              ? ''
              : `${props.overrall_data.other_diplomats}`,
          icon: MenuBookIcon,
          label: 'Other Diplomats'
        },
        {
          content:
            props.overrall_data.administration === undefined
              ? ''
              : `${props.overrall_data.administration}`,
          icon: AccountBoxIcon,
          label: 'Administration'
        }
      ])
    : (stats = [
        {
          content: '',
          icon: AccountBalanceIcon,
          label: 'Embassy'
        },
        {
          content: '',
          icon: HouseSidingIcon,
          label: 'Consulate'
        },
        {
          content: '',
          icon: FlagIcon,
          label: 'High Commission'
        },
        {
          content: '',
          icon: MenuBookIcon,
          label: 'Other Diplomats'
        },
        {
          content: '',
          icon: AccountBoxIcon,
          label: 'Administration'
        }
      ]);

    // Getting department
    const get_section = (section) => {
      // onsole.log(section)
      props.get_child_section(section);
    };

  return (
    <Box
      sx={{
        backgroundColor: 'background.default',
        pb: 3,
        pt: 3
      }}
    >
      <Container maxWidth="lg">
        {props.overrall_data !== null ? (
          <FormLabel component="label" className={classes.formLabel}>
            Battalion two overall total : {props.overrall_data.total}{' '}
          </FormLabel>
        ) : null}
        <Grid container spacing={1}>
          {stats.map((item) => (
            <Grid item key={item.label} md={4} xs={12}>
              {/*<SummaryItem content={item.content} icon={item.icon} label={item.label} />*/}
              <Summary
                get_section={get_section}
                content={item.content}
                icon={item.icon}
                label={item.label}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

const mapStateToProps = (state) => ({
  messages: state.messages,
  auth: state.auth,
  error: state.errors,
  overrall_data: state.battallions_fetch.battalion_two_overrall_data
});

export default connect(mapStateToProps, null)(Content_Dashboard);
