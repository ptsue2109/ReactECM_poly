import React from 'react'
import { Divider } from 'primereact/divider';
import styled from 'styled-components';
type Props = {}

const Footer = (props: Props) => {

    return (
        <>
            <Divider />
            <div className="footer">
                <div className="bg-red-900 h-3rem text-white flex justify-content-center align-items-center">
                    Created by SUE
                </div>
            </div>
        </>
    )
}

export default Footer