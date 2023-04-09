import React, { useEffect } from 'react'
import openai from '@/openai'
import { VscLoading } from 'react-icons/vsc'
import supabase from '@/supabase'

export default function Ads() {
    const [title, setTitle] = React.useState('')
    const [content, setContent] = React.useState('')
    const [output, setOutput] = React.useState(null)
    const [loading, setLoading] = React.useState(false)
    const [copyText, setCopyText] = React.useState('Copy')

    const handlTitleChange = (e) => {
        setTitle(e.target.value)
    }
    const handleContentChange = (e) => {
        setContent(e.target.value)
    }

    const saveToDb = async () => {
        const { data, error } = await supabase
            .from('data')
            .insert([
                { data: output },
            ])
    }

    const onClick = async () => {
        setLoading(true)
        const prompt = `Product Title : ${title}, 
        Product Explanation: ${content}`

        const res = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [{
                role: "assistant",
                content: `Your job is to generate 2-3 an amazing well-curated highly SEO optimzed Advertisement and Product Description according to the inputs user has provided. Use <hr/> for diving the results
                Give output in html format. Use following tags to format your output.
                use <b></b> for headings and <italic></italic> for italic text,
                Add <br></br> for line breaks for new paragraphs,
                <underline></underline> for underlined text, 
                <p></p> for paragraphs, 
                <ul></ul> for unordered lists, 
                <ol></ol> for ordered lists, 
                <li></li> for list items, 
                <a></a> for links, 
                <hr></hr> for horizontal rules, 
                <blockquote></blockquote> for blockquotes, 
                <code></code> for inline code, 
                <pre></pre> for code blocks, 
                <table></table> for tables, 
                <tr></tr> for table rows, 
                <th></th> for table headings, 
                <td></td> for table data, 
                <sup></sup> for superscript, 
                <sub></sub> for subscript, 
                <span></span> for inline styles, 
                <div></div> for block-level elements, 
                <h1></h1>, <h2></h2>, <h3></h3>, <h4></h4>, <h5></h5> , <h6></h6> for headings, 
                <em></em> for emphasis, 
                <strong></strong> for strong importance, 
                <del></del> for deleted text, 
                <ins></ins> for inserted text, 
                <q></q> for quotes, 
                <cite></cite> for citations, 
                <dfn></dfn> for definitions, 
                <abbr></abbr> for abbreviations, 
                <address></address> for addresses, 
                <bdo></bdo> for bidirectional text override, 
                <kbd></kbd> for keyboard input, 
                <samp></samp> for sample output, 
                <var></var> for variables, <b></b> for bold text, 
                <i></i> for italic text, <u></u> for underlined text`
            },
            {
                role: "user",
                content: prompt
            }
            ]
        })
        console.log(res.data.choices[0].message.content)
        setOutput(res.data.choices[0].message.content)
        saveToDb()
        setLoading(false)
    }

    const copyToClipboard = () => {
        let text = output
        // remove html tags
        text = text.replace(/<[^>]*>?/gm, '')
        navigator.clipboard.writeText(text)
        setCopyText('Copied')
        setTimeout(() => {
            setCopyText('Copy')
        }, 1000)
    }

    return (
        <div className='flex flex-col items-center w-full min-h-screen lg:h-screen py-2 bg-white px-6 lg:px-36 md:px-24'>
            <h4 className='text-3xl font-bold mb-8 mt-4'>
                Ads and Description Generator
            </h4>
            <div className='flex flex-col h-5/6 lg:flex-row space-y-8 lg:space-y-0 items-center justify-start lg:justify-between w-full'>
                <div className='flex flex-col items-start justify-center w-full space-y-3 px-4 py-6 rounded-lg md:w-3/4 lg:w-1/3 bg-gray-100 border-gray-200 border'>
                    <h6 className='font-bold'>
                        Product Name/Type
                    </h6>
                    <textarea
                        onChange={handlTitleChange}
                        rows={2} type="text" placeholder="Product Name" className='w-full px-4 py-2 rounded-lg border-gray-200 border focus:outline-none focus:ring-4 focus:ring-gray-300 transition-all ease-in focus:border focus:border-black' />
                    <h6 className='text-md font-bold'>
                        Explain your product little bit
                    </h6>
                    <textarea
                        onChange={handleContentChange}
                        rows={4}
                        placeholder="We sell unique refillable ink-pens with ink remover" className='w-full px-4 py-2 rounded-lg border-gray-200 border focus:outline-none focus:ring-4 focus:ring-gray-300 transition-all ease-in focus:border focus:border-black' />
                    <button onClick={onClick} className='flex flex-row items-center justify-center w-full px-4 py-3 hover:bg-gray-950 transition-all ease-in rounded-lg bg-brand text-white font-bold'>
                        Generate {
                            loading ?
                                <VscLoading className='animate-spin ml-3' />
                                : null
                        }
                    </button>
                </div>
                <div className='hidden lg:block w-px h-2/3 bg-gray-200'></div>
                {/* Generated Content will show up here */}
                <div className='flex flex-col items-start w-full px-4 py-6 rounded-lg lg:h-4/5 h-2/3 md:w-3/4 lg:w-3/6 bg-gray-100 border-gray-200 border overflow-y-auto relative z-50 resize-y'>
                    <div className='flex flex-row items-center justify-center w-full'>
                        <h6 className='text-xl font-bold'>
                            Result
                        </h6>
                    </div>
                    <div className='whitespace-pre-wrap mt-4' dangerouslySetInnerHTML={{ __html: output }}>
                    </div>
                    {output !== null ? <div className='flex flex-row items-center justify-center w-full mt-4 sticky bottom-0 right-0'>
                        {/* copy button */}
                        <button onClick={copyToClipboard} className='flex flex-row items-center justify-center w-full px-4 py-3 hover:bg-gray-950 transition-all ease-in rounded-lg bg-brand text-white font-bold'>
                            {copyText}
                        </button>
                    </div> : null}
                </div>
            </div>
        </div>
    )
}