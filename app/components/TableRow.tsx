"use client"
import React, { useState } from 'react';
import Image from 'next/image';
import TableCell from './common/TableCell';
import AddButton from './common/AddButton';
import type { Identifier, XYCoord } from 'dnd-core'
import { useRef } from 'react'
import { useDrag, useDrop } from 'react-dnd'

interface DragItem {
    index: number
    id: string
    type: string
}

interface UploadedImage {
    url: string;
    name: string;
}

interface UploadedImages {
    [key: number]: UploadedImage;
}

export const ItemTypes = {
    CARD: 'card',
}

const TableRow = ({ state, variants, removeState, index, id, addVariant, moveRow }: any) => {

    const [uploadedImages, setUploadedImages] = useState<UploadedImages>({});

    const handleImageUpload = (event: any, variantId: any) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setUploadedImages((prev: any) => ({
                    ...prev,
                    [variantId]: { url: reader.result, name: file.name },
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const ref = useRef<HTMLTableRowElement>(null);
    const [{ handlerId }, drop] = useDrop<
        DragItem,
        void,
        { handlerId: Identifier | null }
    >({
        accept: ItemTypes.CARD,
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId(),
            }
        },
        hover(item: DragItem, monitor) {
            if (!ref.current) {
                return
            }
            const dragIndex = item.index
            const hoverIndex = index

            // Don't replace items with themselves
            if (dragIndex === hoverIndex) {
                return
            }

            // Determine rectangle on screen
            const hoverBoundingRect = ref.current?.getBoundingClientRect()

            // Get vertical middle
            const hoverMiddleY =
                (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

            // Determine mouse position
            const clientOffset = monitor.getClientOffset()

            // Get pixels to the top
            const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top

            // Only perform the move when the mouse has crossed half of the items height
            // When dragging downwards, only move when the cursor is below 50%
            // When dragging upwards, only move when the cursor is above 50%

            // Dragging downwards
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return
            }

            // Dragging upwards
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return
            }

            // Time to actually perform the action
            moveRow(dragIndex, hoverIndex)

            // Note: we're mutating the monitor item here!
            // Generally it's better to avoid mutations,
            // but it's good here for the sake of performance
            // to avoid expensive index searches.
            item.index = hoverIndex
        },
    })

    const [{ isDragging }, drag] = useDrag({
        type: ItemTypes.CARD,
        item: () => {
            return { id, index }
        },
        collect: (monitor: any) => ({
            isDragging: monitor.isDragging(),
        }),
    })

    const opacity = isDragging ? 0 : 1
    drag(drop(ref))

    return (
        //create individual table rows component for each state
        <tr key={state.id} className="h-[200px] cursor-pointer group" style={{ opacity }} ref={ref} data-handler-id={handlerId}>
            {/* state id with delete button */}
            <TableCell className="sticky-header left-0">
                <button onClick={() => removeState(state.id)} className="cursor-pointer flex-center transition-opacity duration-300 opacity-0 group-hover:opacity-100">
                    <Image src="/delete.svg" alt="Remove" width={20} height={20} className='w-[20px] h-[20px]' />
                </button>
                <div className='flex-center gap-3'>
                    <h1 className="heading text-3xl md:text-4xl font-bold">{state.name}</h1>
                    <button className="cursor-pointer">
                        <Image src='/Drag.png' alt="Drag" width={20} height={20} className='w-[20px] h-[20px]' />
                    </button>
                </div>
            </TableCell>
            {/* table filter section */}
            <TableCell className="sticky-header left-[70px]">
                <div className="flex-center gap-2 border-dashed border-TextGreyLight rounded-md cursor-pointer p-3 custom-shadow w-[300px] h-[160px] bg-white">
                    <button className="filterButton flex-center gap-3">
                        <Image src="/add.svg" alt="Add" width={20} height={20} className='w-[20px] h-[20px]' />
                        <p className="text-TextGrey">Add Product Filter</p>
                    </button>
                </div>
            </TableCell>
            {/* table variants section map all variants */}
            <TableCell colSpan={variants.length}>
                <div className="flex space-x-4 overflow-x-auto hidden-scrollbar">
                    {variants.map((variant: any) => (
                        <div key={variant.id} className="min-w-[200px]">
                            <div className="flex-center gap-2 border-dashed border-TextGreyLight rounded-md cursor-pointer p-3 custom-shadow w-[180px] h-[160px] bg-white relative">
                                <input
                                    type="file"
                                    accept="image/*"
                                    id={`file-upload-${variant.id}`}
                                    style={{ display: 'none' }}
                                    onChange={(e) => handleImageUpload(e, variant.id)}
                                />
                                {uploadedImages[variant.id as number] ?
                                    <label htmlFor={`file-upload-${variant.id}`} className="filterButton flex-center gap-3 cursor-pointer bg-white absolute transition-opacity duration-300 opacity-0 group-hover:opacity-100">
                                        <Image src="/upload.svg" alt="change" width={20} height={20} className='w-[20px] h-[20px]' />
                                    </label>
                                    :
                                    <label htmlFor={`file-upload-${variant.id}`} className="filterButton flex-center gap-3 cursor-pointer bg-white absolute">
                                        <Image src="/add.svg" alt="Upload" width={20} height={20} className='w-[20px] h-[20px]' />
                                        <p className="text-TextGrey">Add design</p>
                                    </label>
                                }

                                {uploadedImages[variant.id as number] && (
                                    <div className="flex flex-col items-center gap-2">
                                        <Image src={uploadedImages[variant.id as number].url} alt={uploadedImages[variant.id as number].name} width={100} height={100} className="w-[100px] h-[100px] object-cover" />
                                        <h6 className="text-TextGrey">{uploadedImages[variant.id as number].name.length > 15 ? `${uploadedImages[variant.id as number].name.substring(0, 10)}...` : uploadedImages[variant.id as number].name}</h6>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </TableCell>
            {/* add new column button */}
            <TableCell className="sticky-header border-none right-0">
                <AddButton onClick={addVariant} />
            </TableCell>
        </tr>
    );
};

export default TableRow;
