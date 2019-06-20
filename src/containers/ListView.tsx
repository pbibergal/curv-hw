import React from 'react';
import {observer} from "mobx-react"
import {makeStyles, Theme, createStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import theme from "../theme";
import {GroupListItem} from "../components/GroupListItem";
import {CircularProgress} from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      marginBottom: '20px'
    },
    hidden: {
      display: 'none !important'
    },
    progress: {
      margin: theme.spacing(2),
    },
  }),
);

const ListView = (props: any) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography style={
        {marginBottom: '20px', color: theme.palette.text.secondary, fontWeight: 'bold'}
      }>
        Approvers
      </Typography>

      <div style={{textAlign: 'center'}} className={!props.store.loading ? classes.hidden : ''}>
        <CircularProgress className={classes.progress}/>
      </div>

      {
        props.store.list.map((item: any) => {
          if (props.tid === item.id) {
            return (<GroupListItem key={item.id} item={item}/>)
          }
        })
      }
    </div>
  );
};

export default observer(ListView);

