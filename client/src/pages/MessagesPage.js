import React, {useContext} from 'react'
import ContactList from "../components/ContactList";
import {Button, Grid, makeStyles} from '@material-ui/core'
import {AuthContext} from "../context/AuthContext";

export const MessagesPage = () => {

    const useStyles = makeStyles({
        root: {
            flexGrow: 1
        },
        logoutBtn: {
            marginRight: 'auto',

        }
    })

    const classes = makeStyles()
    const auth = useContext(AuthContext)
    return (
        <div>
            <Grid container justify="center" alignItems="center" item xs={12} className={classes.root}>
                <h1>Messages Page</h1>
                <Grid container item xs={12} justify="flex-end">
                    <Button onClick={auth.logout} className={classes.logoutBtn}>LogOut</Button>
                </Grid>
            </Grid>

            <div>
                <ContactList/>
            </div>
        </div>
    )
}