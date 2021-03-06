import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import Moment from "react-moment";
import * as actions from "../../store/actions";
import Spinner from "../UI/Spinner/Spinner";
import { withStyles } from "@material-ui/core/styles";

import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";

import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";

import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";

import Badge from "@material-ui/core/Badge";

import classNames from "classnames";
import Button from "@material-ui/core/Button";
const isEmpty = value =>
  value === undefined ||
  value === null ||
  (typeof value === "object" && Object.keys(value).length === 0) ||
  (typeof value === "string" && value.trim().length === 0);

const styles = theme => ({
  card: {
    width: "100%",
    marginBottom: theme.spacing.unit * 2
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  },
  actions: {
    display: "flex"
  },
  expand: {
    transform: "rotate(0deg)",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    }),
    marginLeft: "auto",
    [theme.breakpoints.up("sm")]: {
      marginRight: -8
    }
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  avatar: {
    margin: 10
  },
  bigAvatar: {
    width: 60,
    height: 60
  },
  badge: {
    top: 1,
    right: -15,
    // The border color match the background color.
    border: `2px solid ${
      theme.palette.type === "light"
        ? theme.palette.grey[200]
        : theme.palette.grey[900]
    }`
  },
  badgeB: {
    top: 7,
    right: -15,
    // The border color match the background color.
    border: `2px solid ${
      theme.palette.type === "light"
        ? theme.palette.grey[200]
        : theme.palette.grey[900]
    }`
  }
});

class posts extends Component {
  state = { expanded: false };
  componentDidMount() {
    this.props.getPosts();
  }
  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };
  render() {
    const { classes } = this.props;
    return this.props.post.loading ||
      this.props.post === null ||
      Object.keys(this.props.post.posts).length === 0 ||
      isEmpty(this.props.post.posts) ? (
      <Spinner />
    ) : (
      this.props.post.posts.map(post => (
        <Card className={classes.card}>
          <CardHeader
            avatar={
              <Avatar
                alt="Adelle Charles"
                src={post.avatar}
                className={classNames(classes.avatar, classes.bigAvatar)}
              />
            }
            title={post.name}
            subheader={<Moment format="YYYY/MM/DD HH:mm">{post.date}</Moment>}
          />
          {/* <CardMedia
            className={classes.media}
            image="/static/images/cards/paella.jpg"
            title="Contemplative Reptile"
          /> */}
          <CardContent>
            <Typography component="p">{post.text}</Typography>
          </CardContent>
          <CardActions className={classes.actions} disableActionSpacing>
            <IconButton disabled aria-label="Cart">
              <Badge
                badgeContent={post.likes.length}
                color="primary"
                classes={{ badge: classes.badge }}
              >
                {post.likes.length > 0 ? (
                  <i class="fas fa-thumbs-up" />
                ) : (
                  <i class="far fa-thumbs-up" />
                )}
              </Badge>
            </IconButton>

            <Badge
              color="primary"
              badgeContent={post.comments.length}
              classes={{ badge: classes.badgeB }}
            >
              <Button
                style={{ marginLeft: "8px" }}
                disabled
                variant="contained"
              >
                comment
              </Button>
            </Badge>
          </CardActions>
        </Card>
      ))
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  post: state.post
});

export default connect(
  mapStateToProps,
  actions
)(withRouter(withStyles(styles)(posts)));
