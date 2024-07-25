"use client"
import React, { useState } from 'react';
import Image from 'next/image';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddButton from './common/AddButton';
import TableCell from './common/TableCell';
import RemoveButton from './common/RemoveButton';

const Table = () => {
    const [states, setStates] = useState([{ id: 1, name: '1' }]);
    const [variants, setVariants] = useState([{ id: 1, name: 'Primary Variant' }]);

    const addState = () => {
        const newState = { id: states.length + 1, name: `${states.length + 1}` };
        setStates([...states, newState]);
        toast.success('Row added');
    };

    const removeState = (id:any) => {
        setStates(states.filter(state => state.id !== id));
        toast.error('Row removed');
    };

    const addVariant = () => {
        const newVariant = { id: variants.length + 1, name: `Variant ${variants.length + 1}` };
        setVariants([...variants, newVariant]);
        toast.success('Column added');
    };

    const removeVariant = (id:any) => {
        setVariants(variants.filter(variant => variant.id !== id));
        toast.error('Column removed');
    };

    return (
        <div className="container mx-auto my-4 bg-[#FAFAFA] p-4 border border-TextGreyLight">
            <div className="overflow-x-auto">
                <table className="min-w-full">
                    <thead>
                        <tr>
                            <TableCell className="sticky-header left-0">{" "}</TableCell>
                            <TableCell className="text-TextGrey w-[300px]">Product Filter</TableCell>
                            <TableCell className="w-[600px]">
                                <div className='flex items-center justify-between gap-3'>
                                    <div className="flex space-x-4 overflow-x-auto hidden-scrollbar">
                                        {variants.map((variant) => (
                                            <div key={variant.id} className="min-w-[200px] flex items-center justify-between gap-3 border-r">
                                                <p className="text-TextGrey">{variant.name}</p>
                                                <RemoveButton onClick={() => removeVariant(variant.id)} icon="/ColDelete.svg" />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </TableCell>
                        </tr>
                    </thead>
                    <tbody>
                        {states.map((state) => (
                            <tr key={state.id} className='h-[200px]'>
                                <TableCell className="sticky-header left-0">
                                    <div className='flex-center gap-3'>
                                        <h1 className="heading text-3xl md:text-4xl font-bold">{state.name}</h1>
                                        <RemoveButton onClick={() => removeState(state.id)} icon="/delete.svg" />
                                    </div>
                                </TableCell>
                                <TableCell className="">
                                    <div className="flex-center gap-2 border border-TextGreyLight rounded-md cursor-pointer p-3 custom-shadow w-[300px] h-[160px] bg-white">
                                        <button className="filterButton flex-center gap-3">
                                            <Image src="/add.svg" alt="Add" width={20} height={20} className='w-[20px] h-[20px]' />
                                            <p className="text-TextGrey">Add Product Filter</p>
                                        </button>
                                    </div>
                                </TableCell>
                                <TableCell colSpan={variants.length}>
                                    <div className="flex space-x-4 overflow-x-auto hidden-scrollbar">
                                        {variants.map((variant) => (
                                            <div key={variant.id} className="min-w-[200px]">
                                                <div className="flex-center gap-2 border border-TextGreyLight rounded-md cursor-pointer p-3 custom-shadow w-[180px] h-[160px] bg-white">
                                                    <button className="filterButton flex-center gap-3">
                                                        <Image src="/add.svg" alt="Add design" width={20} height={20} className='w-[20px] h-[20px]' />
                                                        <p className="text-TextGrey">Add design</p>
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </TableCell>
                                <TableCell className="sticky-header right-0">
                                    <AddButton onClick={addVariant} />
                                </TableCell>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot>
                        <tr>
                            <TableCell className="sticky-header left-0">
                                <AddButton onClick={addState} />
                            </TableCell>
                        </tr>
                    </tfoot>
                </table>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Table;
