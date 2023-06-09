import React, { useEffect } from 'react';
import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/24/outline'
import { useFormik } from 'formik';
import axios from 'axios';



const ListRestuarant = () => {

  const [ data , setData ] = useState([])
  

  const formik = useFormik({
    initialValues: { 
      name: "",
      location: "",
      cuisine_type: "" 
    },
    onSubmit: values => {
      // Handle form submission
      axios.post('http://localhost:8080/api/restuarants', values)
        .then(response => {
          // Handle successful response
          console.log(response.data);
        })
        .catch(error => {
          // Handle error
          console.error(error);
        });
    },
  });

  useEffect(() => {
    // Fetch data when the component mounts
    axios.get('http://localhost:8080/api/restuarants')
      .then(response => {
        setData(response.data);
        // Set the fetched data into the form fields
        formik.setValues(data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

const transactions = [
    {
      id: '1',
      company: 'Chase & Co.',
      share: 'CAC',
      commission: '+$4.37',
      price: '$3,509.00',
      quantity: '12.00',
      netAmount: '$4,397.00',
    },
    {
      id: '2',
      company: 'Chase & Co.',
      share: 'CAC',
      commission: '+$4.37',
      price: '$3,509.00',
      quantity: '12.00',
      netAmount: '$4,397.00',
    },
    {
      id: '3',
      company: 'Chase & Co.',
      share: 'CAC',
      commission: '+$4.37',
      price: '$3,509.00',
      quantity: '12.00',
      netAmount: '$4,397.00',
    },
    // More transactions...
  ]

const [open, setOpen] = useState(true)  



 return <>
     <div className="container mx-auto pt-10">
        <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
            <h1 className="text-base font-semibold leading-6 text-gray-900">Restaurants</h1>
            <p className="mt-2 text-sm text-gray-700">
                A table of restaurants with their names and basic details like cuisine type and location
            </p>
            </div>
            <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
            <button
                type="button"
                className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                onClick={() => setOpen(true)}
            >
                Add Restaurant
            </button>
            </div>
        </div>
        <div className="mt-8 flow-root">
            <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                <table className="min-w-full divide-y divide-gray-300">
                <thead>
                    <tr>
      
                    <th
                        scope="col"
                        className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900 uppercase"
                    >
                        Restaurant Name
                    </th>
                    <th
                        scope="col"
                        className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900 uppercase"
                    >
                        Cuisine Type
                    </th>
                    <th
                        scope="col"
                        className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900 uppercase"
                    >
                        Location
                    </th>
                    <th scope="col" className="relative whitespace-nowrap py-3.5 pl-3 pr-4 sm:pr-0">
                        <span className="sr-only">Edit</span>
                    </th>
                    <th scope="col" className="relative whitespace-nowrap py-3.5 pl-3 pr-4 sm:pr-0">
                        <span className="sr-only">Delete</span>
                    </th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                    {data.map((data) => (
                    <tr key={data.name}>
                  
                        <td className="whitespace-nowrap px-2 py-2 text-sm font-medium text-gray-900">
                        {data.name}
                        </td>
                        <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-900">{data.cuisine_type}</td>
                        <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-500">{data.location}</td>
                        <td className="relative whitespace-nowrap py-2 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                        <a href="#" className="text-indigo-600 hover:text-indigo-900">
                            Edit<span className="sr-only">, {data.name}</span>
                        </a>
                        </td>
                        <td className="relative whitespace-nowrap py-2 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                        <a href="#" className="text-red-600 hover:text-red-900">
                            Delete<span className="sr-only">, {data.name}</span>
                        </a>
                        </td>
                    </tr>
                    ))}
                </tbody>
                </table>
            </div>
            </div>
        </div>
        </div>
     </div>

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
                     Add a Restaurant with it's details
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
                                    value={formik.values.tyoe}
                                    />
                                </div>
                            </div>
                            <div className="mt-5 sm:mt-6">
                  <button
                    type="submit"
                    className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    onClick={() => setOpen(false)}
                  >
                    Add Restaurant
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

export default ListRestuarant