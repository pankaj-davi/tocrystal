import React from 'react';
import Link from "next/link";

function InvalidLink() {
    return (
        <div>
            <h1>Invalid Link</h1>
            <p>It looks like you may have clicked on an invalid link or this link is expired. Please close this window and try again.</p>
            <div >
                <p>
                    <span >
                        <Link  href={"/login"} passHref> Return Login</Link>
                    </span>
                </p>
            </div>
        </div>
    )
}

export default InvalidLink;
