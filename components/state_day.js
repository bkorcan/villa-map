import create from 'zustand'

const useStore = create(set => ({

  moveRight:false,
  setMoveRight:(v)=>set( state=>({ moveRight:v }) ),

  show:'none',
  setShow:(v)=> set( state=>({ show:v }) ),

  checkInText:'Check In',
  setCheckInText:(v)=>set( state=>({ checkInText:v }) ),

  checkOutText:'Check Out',
  setCheckOutText:(v)=>set( state=>({ checkOutText:v }) ),

  disabled: {before:new Date()} ,
  setDisabled:(v)=>set( state=>({disabled:v}) ),

  focus:false,
  setFocus:v=>set(state=>({focus:v}) ),
  
  call:false,
  setCall:v=>set( state=>({call:v}) ),

  price:0,
  setPrice:v=>set(state=>({ price:v }) ),

}))



export {useStore}