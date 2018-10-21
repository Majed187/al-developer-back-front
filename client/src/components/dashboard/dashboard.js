import React, { Fragment } from "react";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import { withStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Spinner from "../UI/Spinner/Spinner";
import DisplayProfile from "./displayProfile/displayProfile";
import ProfileActions from "./profileActions/profileActions";

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  }
});
const dashboard = props => {
  const { classes } = props;
  let dashboardData = <p>hello dash</p>;
  if (props.profile.profile === null || props.profile.loading) {
    dashboardData = <Spinner />;
  } else {
    if (Object.keys(props.profile.profile).length > 0) {
      dashboardData = (
        <Fragment>
          <Typography variant="h5" gutterBottom>
            Welcome: {props.auth.name}
          </Typography>
          <ProfileActions />
          <DisplayProfile />

          <div style={{ marginBottom: "60px" }}>
            <button
              onClick={e => props.onDeleteHandler(e)}
              className="btn btn-danger"
            >
              Delete My Account
            </button>
          </div>
        </Fragment>
      );
    } else {
      dashboardData = (
        <Fragment>
          <Typography variant="h5" gutterBottom>
            Welcome: {props.auth.name}
          </Typography>
          <Typography variant="subheading" gutterBottom>
            you have not yet create your profile please add some info !
          </Typography>
          <Link to="/create-profile">
            <Button
              variant="fab"
              color="primary"
              aria-label="Add"
              className={classes.button}
            >
              <AddIcon />
            </Button>
          </Link>
        </Fragment>
      );
    }
  }
  return dashboardData;
};

export default withStyles(styles)(dashboard);
