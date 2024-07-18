'use client'
import { supabase } from '@/utils/supabase/client'
import React, { useEffect, useState } from 'react'
import Slider from '../_components/Slider'

const ViewListing = ({params}) => {

    const [listingDetail,setListingDetail] = useState();
    useEffect(() => {
        GetListingDetail();
    },[]);

    const GetListingDetail = async () => {
        const {data,error} = await supabase
        .from('listing')
        .select('*,listingImages(url,listing_id)')
        .eq('id',params.id)
        .eq('active',true)

        if(data){
            setListingDetail(data[0]);
        }
        if(error){
            toast('Server side error')
        }
    }
  return (
    <div className='px-4 md:px-32 lg:px-56 my-3'>
        <Slider imageList={listingDetail?.listingImages} />
    </div>
  )
}

export default ViewListing
