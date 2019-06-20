import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import './style.css';
import {withStyles, createStyles, WithStyles} from '@material-ui/styles';
import {Theme} from '@material-ui/core';
import {DialogContent, DialogTitle} from "../components/UiDialog";
import Dialog from "@material-ui/core/Dialog";
import ListView from "./ListView";
import Icon from '@material-ui/core/Icon';
import theme from "../theme";
import TransactionStore from "../store";
import {fetchTransaction} from "../lib/api";
import {Transaction} from "../lib/entities";

const TRANSACTION_IDS = ['1', '2'];

const styles = (theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.palette.primary.main,
      width: '100%',
      height: '100%'
    },
    logo: {
      width: 120,
      marginBottom: 60
    },
    button: {
      backgroundColor: 'white',
      color: theme.palette.text.primary,
      // color: 'white',
      marginBottom: 20,
      width: 240,
      height: 50
    }
  });

type Props = WithStyles<typeof styles>;

const store = new TransactionStore();

function TransactionScreen({classes}: Props) {
  const [openDialog, setOpenDialog] = useState(false);
  const [currentTid, setTid] = useState('');
  const getList = (tid: string) => {
    if(store.list.filter(listItem => listItem.id === tid).length === 0) {
      store.loading = true;

      fetchTransaction(tid)
        .then((value: Transaction) => store.addItems(value));
    }
  };

  return (
    <div className={classes.root}>
      <img src="./curv_logo_white.png" alt="logo" className={classes.logo}/>

      {TRANSACTION_IDS.map(tid => (
        <Button
          variant="contained"
          size="large"
          className={classes.button}
          key={tid}
          onClick={() => {
            setOpenDialog(true);
            setTid(tid);
            getList(tid);
          }}
        >
          {`View Transaction ${tid}`}
        </Button>
      ))}

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle id="list-title" onClose={() => setOpenDialog(false)}>
          Transaction {currentTid}
        </DialogTitle>
        <DialogContent>
          <ListView store={store} tid={currentTid}/>
          <Button style={
            {width: '100%', background: theme.palette.primary.dark, color: '#fff'}
          } onClick={() => setOpenDialog(false)} color="primary">
            <Icon>done</Icon>
            Approve
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default withStyles(styles)(TransactionScreen);
