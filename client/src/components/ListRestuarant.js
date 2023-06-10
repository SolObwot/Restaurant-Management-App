import React, { useEffect } from 'react';
import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import axios from 'axios';
import AddRestuarant from './AddRestuarant';
import EditRestuarant from './EditRestuarant';



const ListRestuarant = () => {

const [editData, setEditData] = useState(false)

const [ data , setData ] = useState([])

const [open, setOpen] = useState(false) 

const [remove, setRemove] = useState(false)  

const [dataToEdit, setDataToEdit] = useState(false)



const cancelButtonRef = useRef(null)



  const editRestaurant = (data) =>{
    setDataToEdit(data)

    setEditData(true);
  }

  const deleteRestaurant = (id) => {
    axios.delete(`http://localhost:8080/api/restuarants/${id}`)
      .then(response => {
        // Handle successful deletion
        // Update the data state variable to remove the deleted restaurant
        
      })
      .catch(error => {
        // Handle error
        console.error(error);
      });
  };


  useEffect(() => {
    // Fetch company data when the component mounts to show on the table
    axios.get('http://localhost:8080/api/restuarants')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);
  

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
                onClick={() => setOpen(true)}>
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
                    <tr key={data.id}>
                  
                        <td className="whitespace-nowrap px-2 py-2 text-sm font-medium text-gray-900">
                        {data.name}
                        </td>
                        <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-900">{data.cuisine_type}</td>
                        <td className="whitespace-nowrap px-2 py-2 text-sm text-gray-500">{data.location}</td>
                        <td className="relative whitespace-nowrap py-2 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                          <button
                          type='button'
                          onClick={()=>editRestaurant(data)}
                          >
                            <a href="#" className="text-indigo-600 hover:text-indigo-900">
                            Edit<span className="sr-only">, {data.name}</span>
                            </a>
                          </button>
                        
                        </td>
                        <td className="relative whitespace-nowrap py-2 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                          <button
                          type='button'
                          onClick={() => setRemove(true)}
                          ref={cancelButtonRef}
                          >
                            <a href="#" className="text-red-600 hover:text-red-900">
                            Delete<span className="sr-only">, {data.name}</span>
                            </a>

                            
                          </button>

                          {/* Transition for Deleting a Restuarant */}

                            <Transition.Root show={remove} as={Fragment}>
                                  <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
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
                                          <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                                            <div className="sm:flex sm:items-start">
                                              <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                                <ExclamationTriangleIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
                                              </div>
                                              <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                                <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                                                  Delete Restaurant
                                                </Dialog.Title>
                                                <div className="mt-2">
                                                  <p className="text-sm text-gray-500">
                                                    Are you sure you want to delete this restuarant? All of your information will be permanently removed
                                                    forever. This action cannot be undone.
                                                  </p>
                                                </div>
                                              </div>
                                            </div>
                                            <div className="mt-5 sm:ml-10 sm:mt-4 sm:flex sm:pl-4">
                                              <button
                                                type="button"
                                                className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:w-auto"
                                                onClick={() => {
                                                  deleteRestaurant(data.id);
                                                  setRemove(false);
                                                  window.location.reload();
                                                }}
                                              >
                                                Delete
                                              </button>
                                              <button
                                                type="button"
                                                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:ml-3 sm:mt-0 sm:w-auto"
                                                onClick={() => setRemove(false)}
                                                ref={cancelButtonRef}
                                              >
                                                Cancel
                                              </button>
                                            </div>
                                          </Dialog.Panel>
                                        </Transition.Child>
                                      </div>
                                    </div>
                                  </Dialog>
                                </Transition.Root>
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




{open && <AddRestuarant open={open} setOpen={setOpen} setList={setData} />}

{editData && <EditRestuarant open={editData} setOpen={setEditData} data={dataToEdit} setList={setData} />}

 </>
}

export default ListRestuarant