import React, { useEffect } from 'react'
import openai from '@/openai'
import { VscLoading } from 'react-icons/vsc'
import supabase from '@/supabase'

export default function BlogTool() {
    const [title, setTitle] = React.useState('')
    const [content, setContent] = React.useState('')
    const [keywords, setKeywords] = React.useState('')
    const [tone, setTone] = React.useState('')
    const [creativity, setCreativity] = React.useState('')
    const [length, setLength] = React.useState(0)
    const [output, setOutput] = React.useState(null)
    const [loading, setLoading] = React.useState(false)
    const [copyText, setCopyText] = React.useState('Copy')

    const handlTitleChange = (e) => {
        setTitle(e.target.value)
    }
    const handleContentChange = (e) => {
        setContent(e.target.value)
    }
    const handleKeywordsChange = (e) => {
        setKeywords(e.target.value)
    }
    const saveToDb = async () => {
        const { data, error } = await supabase
            .from('data')
            .insert([
                { data: output },
            ])
    }
    const handleToneChange = (e) => {
        if (e.target.value === '1') {
            setTone('Formal')
        } else if (e.target.value === '2') {
            setTone('Informal')
        } else if (e.target.value === '3') {
            setTone('Casual')
        } else if (e.target.value === '4') {
            setTone('Professional')
        } else if (e.target.value === '5') {
            setTone('Bold')
        } else if (e.target.value === '6') {
            setTone('Friendly')
        }
    }
    const handleCreativityChange = (e) => {
        if (e.target.value === '1') {
            setCreativity('Low')
        } else if (e.target.value === '2') {
            setCreativity('Medium')
        } else if (e.target.value === '3') {
            setCreativity('High')
        }
    }
    const handleLengthChange = (e) => {
        setLength(e.target.value)
    }

    const onClick = async () => {
        setLoading(true)
        const prompt = `${title}, Blog Content: ${content}
        Keywords: ${keywords}, Tone: ${tone}, Creativity: ${creativity}, Length: ${length}`
        const res = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [{
                role: "assistant",
                content: `Your job is to generate a blog according to the inputs user has provided. 
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
        text = text.replace(/<[^>]*>?/gm, '');
        navigator.clipboard.writeText(text)
        setCopyText('Copied!')
        setTimeout(() => {
            setCopyText('Copy')
        }, 1000)
    }

    return (
        <div className='flex flex-col items-center w-full min-h-screen lg:h-screen py-2 bg-white px-6 lg:px-36 md:px-24'>
            <h4 className='text-3xl font-bold mb-8 mt-4'>
                Blog Tool
            </h4>
            <div className='flex flex-col h-full lg:h-5/6 lg:flex-row space-y-8 lg:space-y-0 items-center justify-start lg:justify-between w-full'>
                <div className='flex flex-col items-start justify-center w-full space-y-3 px-4 py-6 rounded-lg md:w-3/4 lg:w-1/3 bg-gray-100 border-gray-200 border'>
                    <h4 className='text-md font-bold'>
                        Blog Title
                    </h4>
                    <textarea
                        onChange={handlTitleChange}
                        rows={2} type="text" placeholder="Blog Title" className='w-full px-4 py-2 rounded-lg border-gray-200 border focus:outline-none focus:ring-4 focus:ring-gray-300 transition-all ease-in focus:border focus:border-black' />
                    <h4 className='text-md font-bold'>
                        Blog Content
                    </h4>
                    <textarea
                        onChange={handleContentChange}
                        rows={4}
                        placeholder="Blog Content" className='w-full px-4 py-2 rounded-lg border-gray-200 border focus:outline-none focus:ring-4 focus:ring-gray-300 transition-all ease-in focus:border focus:border-black' />
                    <h4 className='text-md font-bold'>
                        Blog Keywords
                    </h4>
                    <input
                        onChange={handleKeywordsChange}
                        type="text"
                        placeholder="Keywords" className='w-full px-4 py-2 rounded-lg border-gray-200 border focus:outline-none focus:ring-4 focus:ring-gray-300 transition-all ease-in focus:border focus:border-black' />
                    <h4 className='text-md font-bold'>
                        Blog Length
                    </h4>
                    <input type={"number"}
                        onChange={handleLengthChange}
                        placeholder="Length" className='w-full px-4 py-2 rounded-lg border-gray-200 border focus:outline-none focus:ring-4 focus:ring-gray-300 transition-all ease-in focus:border focus:border-black'
                    />
                    <h4 className='text-md font-bold'>
                        Blog Tone
                    </h4>
                    <select
                        onChange={handleToneChange}
                        title='Select Tone' className='w-full px-4 py-2 rounded-lg border-gray-200 border focus:outline-none focus:ring-4 focus:ring-gray-300 transition-all ease-in focus:border focus:border-black'>
                        <option value="1">Formal</option>
                        <option value="2">Informal</option>
                        <option value="3">Casual</option>
                        <option value="4">Professional</option>
                        <option value="5">Bold</option>
                        <option value="6">Friendly</option>
                    </select>
                    <h4 className='text-md font-bold'>
                        Creativity
                    </h4>
                    <select
                        onChange={handleCreativityChange}
                        title='Creativity' className='w-full px-4 py-2 rounded-lg border-gray-200 border focus:outline-none focus:ring-4 focus:ring-gray-300 transition-all ease-in focus:border focus:border-black'>
                        <option value="1">Low</option>
                        <option value="2">Medium</option>
                        <option value="3">High</option>
                    </select>
                    <button onClick={onClick} className='flex flex-row items-center justify-center w-full px-4 py-3 hover:bg-gray-950 transition-all ease-in rounded-lg bg-brand text-white font-bold'>
                        Generate {
                            loading ?
                                <VscLoading className='animate-spin ml-3' />
                                : null
                        }
                    </button>
                </div>
                {/* vertical divier */}
                <div className='hidden lg:block w-px h-2/3 bg-gray-200'></div>
                {/* Generated Content will show up here */}
                <div className='flex flex-col items-start w-full px-4 py-6 rounded-lg h-4/5 md:w-3/4 lg:w-3/6 bg-gray-100 border-gray-200 border overflow-y-auto relative z-50 resize-y'>
                    <div className='flex flex-row items-center justify-center w-full'>
                        <h4 className='text-xl font-bold'>
                            Result
                        </h4>
                    </div>
                    <div className='whitespace-pre-wrap mt-4' dangerouslySetInnerHTML={{ __html: output }}>
                    </div>
                    {!output !== null ? <div className='flex flex-row items-center justify-center w-full mt-4 sticky bottom-0 right-0'>
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