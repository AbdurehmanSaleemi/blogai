import React from 'react'
import supabase from '@/supabase'
import { Inter } from 'next/font/google'
import Head from 'next/head'
import Link from 'next/link'
import logo from '../assets/logo.png'
import Image from 'next/image'

export default function History() {
    const [data, setData] = React.useState([])

    const fetchData = async () => {
        const { data, error } = await supabase
            .from('data')
            .select('*')
        setData(data)

        console.log(data)
    }

    React.useEffect(() => {
        fetchData()
    }, [])

    return (
        <div className='flex flex-col items-center justify-between w-full min-h-screen py-2 bg-white px-6 lg:px-36 md:px-24'>
            <Image src={logo} width={250} />
            <div className='flex flex-col items-start justify-center w-full'>
                <h4 className='text-3xl font-bold mb-8'>History : </h4>
                <div className='flex flex-col space-y-8 lg:space-y-0 lg:items-center items-start justify-start w-full mb-36'>
                    {data.map((tool, index) => (
                        <>
                            <div className='whitespace-pre-wrap mt-4' dangerouslySetInnerHTML={{ __html: tool.data }} />
                            {/* horizontal divider */}
                            <br />
                            <hr className='w-full border-2 border-brand/25 mb-5' />
                            <br />
                        </>
                    ))}
                </div>
            </div>
            <footer className='flex flex-col items-center justify-center w-full'>
                <p className='text-lg font-bold'>All rights Resreved © 2021</p>
            </footer>
        </div>
    )
}

