import { useContext, useState } from 'react';
import { Button, Stack } from 'react-bootstrap';
import { DashCircle, PlusCircle } from 'react-bootstrap-icons';
import { cartContext } from '../templates/page';
import { Trash as TrashIcon } from 'react-bootstrap-icons'


export default function CartListItem(props) {
  const {
    item
  } = props

  const { cartList, setCartList } = useContext(cartContext);

  function increaseAmount(itemId) {
    const candidate = cartList.findIndex(item => item.id === itemId)
    const updatedCart = [...cartList]
    updatedCart[candidate].amount += 1
    setCartList(updatedCart)
  }

  function reduceAmount(itemId) {
    const candidate = cartList.findIndex(item => item.id === itemId)
    const updatedCart = [...cartList]
    updatedCart[candidate].amount -= 1
    setCartList(updatedCart)
  }

  function deleteItem(itemId) {
    setCartList(prev => prev.filter((element) => {
      return element.id !== itemId
    }))
  }

  return (
    <Stack className='p-2' direction="horizontal" gap={3}>
      <span>{item.name}</span>

      {item.amount === 1 ?
        <DashCircle
          as={Button}
          color="gray"
          variant="disabled"
          size={30}

        />
        :
        <DashCircle
          as={Button}
          onClick={() => reduceAmount(item.id)}
          style={{
            cursor: 'pointer'
          }}
          size={30}
        />}
      <span>{item.amount}</span>

      <PlusCircle
        as={Button}
        onClick={() => increaseAmount(item.id)}
        style={{
          cursor: 'pointer'
        }}
        size={30} />

      <Button
        className='me-auto'
        variant="danger"
        onClick={() => deleteItem(item.id)}
      >
        <TrashIcon size={25} />
      </Button>
      <span>{item.price * item.amount}&#8381;</span>
    </Stack>
  )
}