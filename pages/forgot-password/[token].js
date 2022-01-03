import React , {Fragment} from 'react';
import tokens from '../../modals/tokens';
import db from "../../uitility/connectDB";
import ForgetPasswordToken from "../../conponets/userForms/Forms/ForgetPasswordToken";
import InvalidLink from '../../conponets/userForms/Forms/InvalidLink';

function token(props) {

    const { valid, token } = props;
    // eslint-disable-next-line react-hooks/rules-of-hooks

    if (!valid) {
        return (
            <Fragment>
                <InvalidLink  />
            </Fragment>
        )
    }
    
    return (
        <Fragment>
            <ForgetPasswordToken valid={valid} token={token} />
        </Fragment>
    )
}

export default token;

export async function getServerSideProps(context) { 
    
    await db.connect();
    
    const { token } = context.params;

    const tokenDoc  = await tokens.find({_id : token});
    
    const valid  = tokenDoc.length >= 1 ? true : false
     
    return {
        props: {
            token,
            valid : valid
        },
    }
}