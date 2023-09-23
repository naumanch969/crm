import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { deleteImage, uploadImage } from '../redux/action/upload.js';
import { Camera, Clear } from '@mui/icons-material';
import { CircularProgress } from '@mui/material';
import Loader from './Loader.jsx';
import { PiCameraLight } from 'react-icons/pi';

const Upload = ({ image, isMultiple }) => {

    ///////////////////////////////////// VARIABLES ////////////////////////////////////////
    const dispatch = useDispatch()
    const imageRef = useRef(null)
    const { isFetching } = useSelector(state => state.upload)

    ///////////////////////////////////// FUNCTIONS ////////////////////////////////////////
    const returnFilename = (url) => {
        const lastSlashIndex = url?.lastIndexOf('/');
        const filename = url?.substring(lastSlashIndex + 1);
        return filename
    }
    const handleUploadImage = (e) => {
        e.preventDefault()
        const image = e.target.files[0]
        const formData = new FormData();
        formData.append('image', image);
        dispatch(uploadImage(formData, isMultiple));  // here true is for isMultiple
    };
    const handleDelete = (e, url) => {
        e.preventDefault()
        dispatch(deleteImage(returnFilename(url), isMultiple))  // here true is for isMultiple
    }

    ///////////////////////////////////// COMPONENTS ////////////////////////////////////////
    const Image = ({ url }) => (
        <div className="w-full h-full relative flex justify-center items-center ">
            <img src={url} alt="" className="rounded-[8px] w-full h-full bg-cover bg-no-repeat object-center" />
            <button onClick={(e) => handleDelete(e, url)} className="absolute top-[4px] right-[4px] rounded-full bg-black text-white w-[20px] h-[20px] flex justify-center items-center   " ><Clear style={{ fontSize: '16px' }} /></button>
        </div>
    )
    const SingleUpload = ({ url }) => (
        <>
            {
                url
                    ?
                    <Image url={url} />
                    :
                    <div className="w-full h-full bg-gray-200 rounded-[8px] flex justify-center items-center" >
                        <input ref={imageRef} type="file" accept="image/*" className='hidden' onChange={handleUploadImage} />
                        <button onClick={(e) => { e.preventDefault(); imageRef.current.click() }} className="flex flex-col justify-center items-center text-textGray  " >
                            <PiCameraLight className='text-[40px]' />
                            Upload Image
                        </button>
                    </div>
            }
        </>
    )
    const MultipleUpload = ({ urls }) => (
        <>
            {
                urls?.map((url, index) => (
                    <div key={index} className="flex lg:w-[31%] sm:w-[47%] w-full h-[10rem] ">
                        <Image url={url} />
                    </div>
                ))
            }
            <div className="lg:w-[31%] sm:w-[47%] w-full min-h-[10rem] bg-gray-200 rounded-[8px] flex justify-center items-center" >
                <input ref={imageRef} type="file" accept="image/*" className='hidden' onChange={handleUploadImage} />
                <button onClick={(e) => { e.preventDefault(); imageRef.current.click() }} className="flex flex-col justify-center items-center text-gray-500  " >
                    <Camera style={{ fontSize: '36px' }} />
                    Upload Image
                </button>
            </div>
        </>
    )


    if (isFetching)
        <div className="w-full flex justify-center items-center ">
            <Loader />
        </div>

    return (
        <>
            {
                isMultiple
                    ?
                    <MultipleUpload urls={image} />
                    :
                    <SingleUpload url={image} />
            }
        </>

    )
}

export default Upload