"use client"
import React, { useCallback, useState } from 'react';
import AddButton from './common/AddButton';
import TableCell from './common/TableCell';
import update from 'immutability-helper';
import Image from 'next/image';
import TableRow from './TableRow';
import toast, { Toaster } from 'react-hot-toast';

interface UploadedImage {
  url: string;
  name: string;
}

interface UploadedImages {
  [stateId: number]: {
    [variantId: number]: UploadedImage;
  };
}

const Table = () => {
  const [uploadedImages, setUploadedImages] = useState<UploadedImages>({});

  const handleImageUpload = (event: any, stateId: number, variantId: number) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImages((prev: any) => ({
          ...prev,
          [stateId]: {
            ...prev[stateId],
            [variantId]: { url: reader.result, name: file.name },
          },
        }));
      };
      reader.readAsDataURL(file);
    }
  };


  //for manage the row state
  const [data, setData] = useState({
    states: [{ id: 1, name: '1' }],
    variants: [{ id: 1, name: 'Primary Variant' }]
  });

  const addState = () => {
    const newState = { id: data.states.length + 1, name: `${data.states.length + 1}` };
    setData(prevData => ({
      ...prevData,
      states: [...prevData.states, newState]
    }));
    toast.success('Row added');
  };

  const removeState = (id: any) => {
    setData(prevData => ({
      ...prevData,
      states: prevData.states.filter(state => state.id !== id)
    }));
    toast.error('Row removed');
  };

  const addVariant = () => {
    const newVariant = { id: data.variants.length + 1, name: `Variant ${data.variants.length + 1}` };
    setData(prevData => ({
      ...prevData,
      variants: [...prevData.variants, newVariant]
    }));
    toast.success('Column added');
  };

  const removeVariant = (id: any) => {
    setData(prevData => ({
      ...prevData,
      variants: prevData.variants.filter(variant => variant.id !== id)
    }));
    //write the same function as i said to delete images from variant
    setUploadedImages(prevUploadedImages => {
      const newUploadedImages = { ...prevUploadedImages };

      
      for (const stateId in newUploadedImages) {
        if (newUploadedImages[stateId][id]) {
          delete newUploadedImages[stateId][id];
        }

        // If the state has no more uploaded images, delete it
        if (Object.keys(newUploadedImages[stateId]).length === 0) {
          delete newUploadedImages[stateId];
        }
      }

      return newUploadedImages;
    });
    toast.error('Column removed');
  };

  //moveRow for drag and drop
  const moveRow = useCallback((dragIndex: number, hoverIndex: number) => {
    setData((prevData) =>
    ({
      ...prevData,
      states: update(prevData.states, {
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, prevData.states[dragIndex]],
        ],
      }),
    })
    );
  }, []);

  return (
    <div className="container mx-auto my-4 bg-[#F9FBFC] p-4 border border-TextGreyLight">
      <div className="overflow-x-auto">
        <table className="max-w-full">
          {/* table header */}
          <thead>
            <tr>
              <TableCell className="sticky-header left-0 border-none w-[80px]">{" "}</TableCell>
              <TableCell className="text-TextGrey w-[300px] sticky-header left-[75px]">Product Filter</TableCell>
              <TableCell className="max-w-[600px]">
                <div className='flex items-center justify-between gap-3'>
                  <div className="flex space-x-4 overflow-x-auto hidden-scrollbar">
                    {data.variants.map((variant) => (
                      <div key={variant.id} className="min-w-[200px] flex items-center justify-between gap-3 border-r">
                        <p className="text-TextGrey">{variant.name}</p>
                        <button onClick={() => removeVariant(variant.id)} className="cursor-pointer">
                          <Image src="/ColDelete.svg" alt="Remove" width={20} height={20} className='w-[20px] h-[20px]' />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </TableCell>
            </tr>
          </thead>
          {/* body of table */}
          <tbody>
            {data.states.map((state, index: number) => (
              <TableRow
                key={state.id}
                index={index}
                id={state.id}
                state={state}
                variants={data.variants}
                removeState={removeState}
                addVariant={addVariant}
                moveRow={moveRow}
                uploadedImages={uploadedImages}
                handleImageUpload={handleImageUpload}
              />
            ))}
          </tbody>
          {/* footer of table */}
          <tfoot>
            <tr>
              <TableCell className="sticky-header left-0">
                <AddButton onClick={addState} />
              </TableCell>
            </tr>
          </tfoot>
        </table>
      </div>
      <Toaster />
    </div>
  );
};

export default Table;
