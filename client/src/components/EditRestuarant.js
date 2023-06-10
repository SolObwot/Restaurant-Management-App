import React, { useEffect } from 'react';
import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/24/outline'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import { useFormik } from 'formik';
import axios from 'axios';

const EditRestuarant = ({open, setOpen, data ,setList }) =>{

    const formik = useFormik({
        initialValues: { 
          ...data
        },
        onSubmit: values => {
            axios.put('http://localhost:8080/api/restuarants/'+ values.id, values)
        .then(response => {
          // Handle successful response
          setList(prev => {
           prev = prev.filter(res => res.id != values.id)
           return [...prev, values]
          });
          formik.resetForm();
        //   dataToEdit(...data);
        
          setOpen(false)
        })
        .catch(error => {
          // Handle error
          console.error(error);
        });
        },
      });

    return <>
    
    {/* Transition for Editing  Restuarant */}
    <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setOpen}>
            <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                    <div>
                    <div className="mt-3 sm:mt-5">
                        <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                        Edit restaurant details
                        </Dialog.Title>
                        <form onSubmit={formik.handleSubmit}>
                            <div className="mt-2">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                                    Restaurant Name
                                    </label>
                                    <div className="mt-2">
                                        <input
                                        type="name"
                                        name="name"
                                        id="name"
                                        className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        placeholder="Restaurant Name"
                                        onChange={formik.handleChange}
                                        value={formik.values.name}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="location" className="block text-sm font-medium leading-6 text-gray-900">
                                    Location
                                    </label>
                                    <div className="mt-2">
                                        <input
                                        type="location"
                                        name="location"
                                        id="location"
                                        className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        placeholder="Restaurant Location"
                                        onChange={formik.handleChange}
                                        value={formik.values.location}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="tyoe" className="block text-sm font-medium leading-6 text-gray-900">
                                    Cuisine Type
                                    </label>
                                    <div className="mt-2">
                                        <input
                                        type="cuisine_type"
                                        name="cuisine_type"
                                        id="cuisine_type"
                                        className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        placeholder="Cuisine Type"
                                        onChange={formik.handleChange}
                                        value={formik.values.cuisine_type}
                                        />
                                    </div>
                                </div>
                                <div className="mt-5 sm:mt-6">
                    <button
                        type="submit"
                        className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        
                    >
                        Edit Restaurant
                    </button>
                    </div>

                                
                            </div>
                        </form>
                        
                    </div>
                    </div>
                    
                </Dialog.Panel>
                </Transition.Child>
            </div>
            </div>
        </Dialog>
    </Transition.Root>
    
    </>

}

export default EditRestuarant