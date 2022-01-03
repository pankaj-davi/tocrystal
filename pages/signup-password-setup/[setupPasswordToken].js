
import React, { Fragment } from 'react'
import InvalidLink from '../../conponets/userForms/Forms/InvalidLink';
import SignupPasswordSet from '../../conponets/userForms/Forms/SignupPasswordSetup';
import tokens from '../../modals/tokens';
import db from "../../uitility/connectDB";

function Index(props) {

    const { token, valid , tokenDoc} = props;
    

    if (!valid) {
        return (
            <Fragment>
                <InvalidLink />
            </Fragment>
        )
    }

    return (
        <Fragment>
            <SignupPasswordSet token={token} valid={valid} userDetail={tokenDoc} />
        </Fragment>
    )
}


export async function getServerSideProps(context) {

     await db.connect();

    const { setupPasswordToken } = context.params;

    const tokenDoc = await tokens.find({ _id: setupPasswordToken });
   
    const valid = tokenDoc.length >= 1 ? true : false;
    
    return {
        props: {
            token : setupPasswordToken,
            valid,
            tokenDoc : JSON.stringify(tokenDoc),
        }
    }

}

export default Index;
