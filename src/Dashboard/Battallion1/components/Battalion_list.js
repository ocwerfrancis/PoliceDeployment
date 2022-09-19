import * as React from 'react';
import { connect } from 'react-redux';
import { Box, Card, CardHeader, Container, Divider, Grid, Typography, Button } from '@mui/material';
import { OrdersTable } from './table';
import Spinner from '../../../components/Spinner';
import BattallionDetail from './Battallion_detail';
import BattallionEdit from './Battallion_edit';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { makeStyles } from '@material-ui/core/styles';

import { battallion_one_fetch_detail } from '../../../actions/battallions_detail';
import DeleteReason from './DeleteReason';
import moment from 'moment';

import { send_notification } from '../../../actions/battallions_create.js';

const useStyles = makeStyles((theme) => ({
  span: {
    fontSize: '23px',
    fontFamily: 'Dosis',
    fontWeight: '800'
  },
  span2: {
    fontSize: '15px',
    fontFamily: 'Dosis',
    fontWeight: '800'
  },
  title: {
    "& .MuiCardHeader-title" : {
      fontFamily: 'Dosis',
      fontWeight: '800'
    }
  }
}));

function Battalion_two_list(props) {
  const classes = useStyles();
  const [show_detail, setToggle] = React.useState(false);
  const [show_edit, showEdit] = React.useState(false);
  const [disable, setDisable] = React.useState(true);
  const battalion = "battallion_one"

  React.useEffect(() => {
    if(props.auth.user.top_level_incharge && props.detail_data !== null){
        setDisable(false)
    }
  }, [props.auth, props.detail_data]);

  const send_detail_id = (id) => {
    setToggle(true);
    props.battallion_one_fetch_detail(id);
  };

  const toggle_UI = () => {
    setToggle(false);
  };

  const toggle_edit_UI = () => {
    showEdit(true);
  };

  const untoggle_edit_UI = () => {
    showEdit(false);
  };

  React.useEffect(() => {
    if (props.data !== null) {
      console.log("Here")
      // eslint-disable-next-line
      props.data.filter((instance) => {
        if (instance.on_leave !== 'Not on leave' && instance.notify_leave === false) {
          var end_date = moment(`${instance.leave_end_date}`);
          // console.log(instance.leave_end_date);
          var current = moment(new Date()); // now
          const prime_difference = end_date.diff(current, 'days') + 1;
          // console.log(prime_difference);
          if (prime_difference <= 0) {
            // console.log('Send notification');
            const new_notify_leave = true;
            const url = 'battallion_one';
            props.send_notification(instance.id, new_notify_leave, url);
            // turn notify_leave to true
          }
        }
      });

      // eslint-disable-next-line
      props.data.filter((instance) => {
        if (instance.status === 'Special duty' && instance.notify_special_duty === false) {
          var end_date = moment(`${instance.special_duty_end_date}`);
          var current = moment(new Date()); // now
          const prime_difference = end_date.diff(current, 'days') + 1;
          if (prime_difference <= 0) {
            const url = 'battallion_one';
            const object = {
              'notify_special_duty' : true
            }
            props.send_notification(instance.id, object, url);
            // turn notify_leave to true
          }
        }
      });
    }
  }, [props]);

  return (
    <Box
      sx={{
        backgroundColor: 'background.default',
        pb: 3,
        pt: 3
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item xs={12}>
            {show_detail === false ? (
              <Card variant="outlined" className={classes.title}>
                <CardHeader
                  title={
                    props.section_title !== null
                      ? `${props.section_title} total: ${props.data.length}`
                      : `Employees total: ${props.data.length}`
                  }
                />
                <Divider />
                <OrdersTable data={props.data} send_detail_id={send_detail_id} />
              </Card>
            ) : (
              <Card variant="outlined">
                {show_edit === false ? (
                  <div>
                    <Box
                      sx={{
                        alignItems: 'center',
                        display: 'flex',
                        mb: 3
                      }}
                    >
                      <Typography
                        color="textPrimary"
                        variant="h4"
                        sx={{
                          marginLeft: '20px'
                        }}
                      >
                        <span
                          style={{
                            fontSize: '23px',
                            fontFamily: 'Dosis',
                            fontWeight: '800'
                          }}
                        >
                          {' '}
                          Employee details{' '}
                        </span>
                      </Typography>
                      <Box sx={{ flexGrow: 1 }} />
                      <Button
                        onClick={toggle_UI}
                        variant="outlined"
                        sx={{ marginRight: '20px', marginTop: '15px' }}
                      >
                        <KeyboardBackspaceIcon />
                      </Button>
                      <Button
                        onClick={toggle_edit_UI}
                        disabled={!(localStorage.getItem("deleted")) ? false : true }
                        variant="outlined"
                        sx={{ marginRight: '20px', marginTop: '15px' }}
                      >
                        <span className={classes.span2}>
                          Edit
                        </span>
                      </Button>
                      <DeleteReason disabled={disable} battalion={battalion} employee={props.detail_data}/>
                      {/* <Button
                        // onClick={toggle_UI}
                        disabled
                        variant="outlined"
                        sx={{ marginRight: '20px', marginTop: '15px' }}
                      >
                        <span
                          style={{
                            fontSize: '15px',
                            fontFamily: 'Dosis',
                            color: 'red',
                            fontWeight: '800'
                          }}
                        >
                          Delete
                        </span>
                      </Button>*/}
                    </Box>

                    {/* Detail component */}
                    <Card>
                      <hr />
                      {props.loading === false && props.detail_data !== null ? (
                        <BattallionDetail employee={props.detail_data} />
                      ) : (
                        <Spinner />
                      )}
                    </Card>
                  </div>
                ) : (
                  <div>
                    <Box
                      sx={{
                        alignItems: 'center',
                        display: 'flex',
                        mb: 3
                      }}
                    >
                      <Typography
                        color="textPrimary"
                        variant="h4"
                        sx={{
                          marginLeft: '20px'
                        }}
                      >
                        <span
                          style={{
                            fontSize: '23px',
                            fontFamily: 'Dosis',
                            fontWeight: '800'
                          }}
                        >
                          {' '}
                          Edit Employee details{' '}
                        </span>
                      </Typography>
                      <Box sx={{ flexGrow: 1 }} />
                      <Button
                        onClick={untoggle_edit_UI}
                        variant="outlined"
                        sx={{ marginRight: '20px', marginTop: '15px' }}
                      >
                        <KeyboardBackspaceIcon />
                      </Button>
                    </Box>

                    {/* Edit component */}
                    <Card>
                      <hr />
                      {props.loading === false && props.detail_data !== null ? (
                        <BattallionEdit employee={props.detail_data} />
                      ) : (
                        <Spinner />
                      )}
                    </Card>
                  </div>
                )}
              </Card>
            )}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

const mapStateToProps = (state) => ({
  messages: state.messages,
  auth: state.auth,
  error: state.errors,
  loading: state.battallions_detail.battalion_one_data_detail_loading,
  detail_data: state.battallions_detail.battalion_one_detail_data
});

export default connect(mapStateToProps, {
  battallion_one_fetch_detail,
  send_notification
})(Battalion_two_list);
