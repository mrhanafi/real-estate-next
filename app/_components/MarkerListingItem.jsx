import { Button } from '@/components/ui/button'
import { Bath, BedDouble, MapPin, Ruler, X } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

const MarkerListingItem = ({item,closeHandler}) => {
  return (
    <div>
        <div className='bg-white cursor-pointer rounded-lg w-[200px] p-2'>
                <X onClick={()=> closeHandler()}/>
                    <Image src={item.listingImages[0].url}
                    width={800}
                    height={150}
                    className='rounded-lg w-[185px] object-cover h-[120px]'
                    alt='image'
                    />
                    <div className='flex mt-2 flex-col gap-2 bg-white'>
                        <h2 className='font-bold text-xl'>RM{item.price}</h2>
                        <h2 className='flex gap-2 text-sm text-gray-400'><MapPin className='h-10 w-10' />{item.address}</h2>
                        <div className='flex gap-2 mt-2 justify-between'>
                            <h2 className='flex gap-2 w-full text-sm bg-slate-200 rounded-md p-2 text-gray-500 items-center justify-center'>
                                <BedDouble className='h-4 w-4'/>
                                {item?.bedroom}
                            </h2>
                            <h2 className='flex gap-2 w-full text-sm bg-slate-200 rounded-md p-2 text-gray-500 items-center justify-center'>
                                <Bath className='h-4 w-4'/>
                                {item?.bathroom}
                            </h2>
                            <h2 className='flex gap-2 w-full text-sm bg-slate-200 rounded-md p-2 text-gray-500 items-center justify-center'>
                                <Ruler className='h-4 w-4'/>
                                {item?.area}
                            </h2>
                        </div>
                            <Button size="sm">View Detail</Button>
                    </div>
                </div>
    </div>
  )
}

export default MarkerListingItem
