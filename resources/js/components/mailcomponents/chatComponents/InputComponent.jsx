import {useEffect, useState} from 'react';
import BlockBanner from './BlockBanner';

const InputComponent = (props) => {
    const {requestInfo, isBlocked} = props;
    const [message, setMessage] = useState('');
    const [file, setFile] = useState({});
    const [width, setWidth] = useState(0);
    const [isUpload, setIsUpload] = useState(false);

    useEffect(() => {
        const elem = $("main");
        console.log(elem.css('width'));
        var messengerWidth = elem.css('width').slice(0, -2) - 110;
        setWidth(messengerWidth);
    })

    const handleMessageChange = (e) => {
        setMessage(e.target.value);
    }

    const handleFileChange = (ev) => {
        console.log("clicked");
        setIsUpload(true);
        const elem = $("input#fileUpload");
        elem.trigger('click');
        elem.on('change', function (e) {
            console.log(e.target.files[0]);
            setFile(e.target.files[0]);
        });
    }

    const sendMessage = () => {
        console.log(requestInfo.status);
        if (requestInfo.status == 5 || isBlocked) {
            showBlockBanner();
        } else {
            setMessage('');
            setFile({});
            setIsUpload(false);
            props.sendMessage(message, file);
        }
    }

    const showBlockBanner = () => {
        $("div#blockBanner").fadeIn(300).delay(2000).fadeOut(300);
    }

    const handleMessageClick = () => {
        props.inboxClickEvent();
    }

    return (
        <div className="w-full md:max-w-7xl fixed bottom-0">
            <BlockBanner/>
            <div className="w-full bg-white relative" style={{height: '60px', borderTop: '1px solid lightgray'}}>
                <div className="float-right">
                    <a onClick={sendMessage} style={{
                        display: 'block',
                        height: '60px',
                        width: '60px',
                        background: 'rgb(10, 192, 198)',
                        fontSize: '20px',
                        lineHeight: '60px',
                        color: 'white'
                    }}>
                        <i className="fas fa-paper-plane"/>
                    </a>
                </div>
                <div className="float-left">
                    <input type="file" hidden id="fileUpload"/>
                    <a onClick={handleFileChange} style={{fontSize: '20px', lineHeight: '60px', padding: '0 10px'}}
                       className="text-gray-400">
                        <i className="fas fa-paperclip"/>
                    </a>
                </div>
                <div>
                    <input type="text" value={message} id="message" className="w-full border-none" autoComplete="off"
                           placeholder="Write a Message ..." onChange={handleMessageChange}
                           style={{width: width + 'px', margin: '10px 0'}} onClick={handleMessageClick}/>
                </div>
                <div className="clearfix"/>
                {
                    (isUpload)
                        ?
                        <div className="absolute -top-6 h-6 w-full bg-grey-200 text-xs leading-6"
                             style={{border: "1px solid lightgrey"}}>
                            <div className="w-11/12 mx-auto flex justify-between">
                                <div className="overflow-clip">{file.name}</div>
                                <div className="overflow-clip w-20">{(file.size / 1024).toFixed(4)} Kb</div>
                            </div>
                        </div>
                        :
                        null
                }
            </div>
        </div>
    );
}

export default InputComponent;
