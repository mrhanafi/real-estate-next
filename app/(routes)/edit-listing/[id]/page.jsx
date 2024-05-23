'use client'
import React, { useEffect } from 'react'
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
  import { Input } from "@/components/ui/input"
  import { Textarea } from "@/components/ui/textarea"
import { Formik } from 'formik'
import {Button} from '@/components/ui/button'
import { usePathname, useRouter } from 'next/navigation'
import {supabase} from '@/utils/supabase/client.js'
import { toast } from 'sonner';
import { useUser } from '@clerk/nextjs'

const EditListing = ({params}) => {
    // const params = usePathname();
    const {user}=useUser();
    const router=useRouter();

    useEffect(() => {
        user&&verifyUserRecord();
    },[user]);

    const verifyUserRecord = async () => {
        const {data,error} = await supabase
        .from('listing')
        .select('*')
        .eq('createdBy',user?.primaryEmailAddress.email)
        .eq('id',params.id);

        console.log(data)
        if(data?.length <= 0){
            router.replace('/')
        }
    }

    const onSubmitHandler = async (formValue) => {
        
        const { data, error } = await supabase
        .from('listing')
        .update(formValue)
        .eq('id', params.id)
        .select();

        if(data){
            toast('Listing updated and Published');
        }
                
    }

  return (
    <div className='px-10 md:px-36 my-10'>
        <h2 className='font-bold text-2xl'>Enter some more details about your listing</h2>
        
        <Formik
        initialValues={{ 
            type:'',
            propertyType:''
         }}
         onSubmit={(values) => {
            onSubmitHandler(values)
            console.log(values)
        }}
        >
            {({
                values,
                handleChange,
                handleSubmit
            }) => (
                <form onSubmit={handleSubmit}>
                    <div className='p-8 rounded-lg shadow-md'>
                        <div className='grid grid-cols-1 md:grid-cols-3'>
                            <div className='flex flex-col gap-2'>
                                <h2 className='text-lg text-slate-500'>Rent or Sell?</h2>
                                <RadioGroup defaultValue="Sell" name='type' onValueChange={(v) => values.type=v}>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="Rent" id="Rent" />
                                    <Label htmlFor="Rent" className='text-lg'>Rent</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="Sell" id="Sell" />
                                    <Label htmlFor="Sell" className='text-lg'>Sell</Label>
                                </div>
                                </RadioGroup>

                            </div>
                            <div className='flex flex-col gap-2'>
                                <h2 className='text-lg text-slate-500'>Property Type</h2>
                                <Select name='propertyType' onValueChange={(e) => values.propertyType=e}>
                                <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Select Property Type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Single Family House">Single Family House</SelectItem>
                                    <SelectItem value="Town House">Town House</SelectItem>
                                    <SelectItem value="Condo">Condo</SelectItem>
                                </SelectContent>
                                </Select>

                            </div>
                        </div>
                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-10 gap-10'>
                            <div className='flex gap-2 flex-col'>
                                <h2 className='text-gray-500'>Bedroom</h2>
                                <Input type="number" placeholder='Ex.2' name="bedroom" onChange={handleChange} />
                            </div>
                            <div className='flex gap-2 flex-col'>
                                <h2 className='text-gray-500'>Bathroom</h2>
                                <Input type="number" placeholder='Ex.2' name="bathroom" onChange={handleChange} />
                            </div>
                            <div className='flex gap-2 flex-col'>
                                <h2 className='text-gray-500'>Built In</h2>
                                <Input type="number" placeholder='Ex.1900 Sq.ft' name="builtIn" onChange={handleChange} />
                            </div>
                        </div>
                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-10 gap-10'>
                            <div className='flex gap-2 flex-col'>
                                <h2 className='text-gray-500'>Parking</h2>
                                <Input type="number" placeholder='Ex.2' name="parking" onChange={handleChange} />
                            </div>
                            <div className='flex gap-2 flex-col'>
                                <h2 className='text-gray-500'>Lot Size (Sq.Ft)</h2>
                                <Input type="number" placeholder='Ex.2' name="lotSize" onChange={handleChange} />
                            </div>
                            <div className='flex gap-2 flex-col'>
                                <h2 className='text-gray-500'>Area (Sq.Ft)</h2>
                                <Input type="number" placeholder='Ex.1900 Sq.ft' name="area" onChange={handleChange} />
                            </div>
                        </div>
                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-10 gap-10'>
                            <div className='flex gap-2 flex-col'>
                                <h2 className='text-gray-500'>Selling Price (RM)</h2>
                                <Input type="number" placeholder='400000' name="price" onChange={handleChange} />
                            </div>
                            <div className='flex gap-2 flex-col'>
                                <h2 className='text-gray-500'>HOA (Per Month) (RM)</h2>
                                <Input type="number" placeholder='100' name="hoa" onChange={handleChange} />
                            </div>
                        </div>
                        <div className='grid grid-cols-1 gap-10 mt-10'>
                            <div className='flex gap-2 flex-col'>
                                <h2 className='text-gray-500'>Description</h2>
                                <Textarea placeholder="" name="description" onChange={handleChange} />
                            </div>
                        </div>
                        <div className='flex gap-3 justify-end m-10'>
                            <Button variant="outline" className="text-primary border-primary">Save</Button>
                            <Button className="">Save & Publish</Button>
                        </div>
                    </div>

                </form>

            )}

        </Formik>
        
    </div>
  )
}

export default EditListing