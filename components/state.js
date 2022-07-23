import create from 'zustand'

const useStore = create(set => ({
    dateArray : [new Date('2000-01-01')],
    setDateArray:(v)=>set( state=>({ dateArray:v }) ),

    dateStart : [new Date('2000-01-01')],
    setDateStart:(v)=>set( state=>({ dateStart:v }) ),

    dateEnd : [new Date('2000-01-01')],
    setDateEnd:(v)=>set( state=>({ dateEnd:v }) ),
    
}))

export {useStore}