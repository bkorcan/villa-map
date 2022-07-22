import create from 'zustand'

const useStore = create(set => ({
    dateArray : [],
    setDateArray:(v)=>set( state=>({ dateArray:v }) ),
}))

export {useStore}