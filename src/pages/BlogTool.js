import { Inter } from 'next/font/google'
import Head from 'next/head'
import Link from 'next/link'
import logo from '../assets/logo.png'
import Image from 'next/image'

function BlogTool() {
    const toolsList = [
        {
            name: 'Blog Writing Tool',
            description: 'A tool to help you create a blog',
            link: '/blogtool'
        },
        {
            name: 'Article Writing Tool',
            description: 'A tool to help you create an article',
            link: '/articletool'
        },
        {
            name: 'Ads Writing Tool',
            description: 'A tool to help you create ads and descriptions',
            link: '/adstool'
        }
    ]

    return (
        <div className='flex flex-col items-center justify-between w-full min-h-screen py-2 bg-white px-6 lg:px-36 md:px-24'>
            <Image src={logo} width={250} />
            <div className='flex flex-col items-start justify-center w-full'>
                <h4 className='text-3xl font-bold mb-8'>Tools : </h4>
                <div className='flex flex-col lg:flex-row space-y-8 lg:space-y-0 lg:space-x-8 lg:items-center items-start justify-start w-full mb-36'>
                    {toolsList.map((tool, index) => (
                        <div key={index} className='flex flex-col items-start justify-center w-full space-y-3 px-4 py-6 rounded-lg md:w-1/2 lg:w-1/3 bg-gray-100 border-gray-200 border'>
                            <h4 className='text-2xl font-bold'>{tool.name}</h4>
                            <p className='text-lg'>{tool.description}</p>
                            <Link href={tool.link}
                                className='
                            text-lg font-bold bg-brand px-4 py-2 text-white rounded-lg hover:bg-gray-700 transition duration-300 ease-in-out hover:text-white'
                            >
                                Launch
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
            <footer className='flex flex-col items-center justify-center w-full'>
                <p className='text-lg font-bold'>All rights Resreved © 2021</p>
            </footer>
        </div>
    )
}

export default BlogTool