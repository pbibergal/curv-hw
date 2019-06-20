import React from 'react';
import {createStyles, Grid, Icon, makeStyles, Theme, Typography} from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    heading: {
      fontSize: theme.typography.pxToRem(15),
      flexBasis: '33.33%',
      flexShrink: 0,
    },
    secondaryHeading: {
      fontSize: theme.typography.pxToRem(15),
      color: theme.palette.text.secondary,
    },
    avatar: {
      marginRight: 10,
    },
    hidden: {
      display: 'none !important'
    }
  }),
);

export const GroupDetails = (props: any) => {
  const classes = useStyles();

  return (
    <Grid container direction="row">
      <Grid item>
        <Avatar className={classes.avatar} style={{backgroundColor: props.color}}>
          <Icon className={!props.isGroup ? classes.hidden : ''}>group</Icon>
          <Icon className={props.isGroup ? classes.hidden : ''}>person</Icon>
        </Avatar>
      </Grid>
      <Grid item>
        <Grid item><Typography className={classes.heading}>{props.title}</Typography></Grid>
        <Grid item><Typography className={classes.secondaryHeading}>{props.subtitle}</Typography></Grid>
      </Grid>
    </Grid>
  );
};
