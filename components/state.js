import create from 'zustand'

const useStore = create(set => ({
    dateStart : new Date('2022-01-01'),
    setDateStart:(v)=>set( state=>({ dateStart:v }) ),

    dateEnd : new Date('2022-01-02'),
    setDateEnd:(v)=>set( state=>({ dateEnd:v }) ),

    minPrice:0,
    setMinPrice:(v)=>set( state=>({ minPrice:v }) ),
    
    maxPrice:10000,
    setMaxPrice:(v)=>set( state=>({ maxPrice:v }) ),
}))

export {useStore}