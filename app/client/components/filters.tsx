import React from 'react'
import { AccountFilter } from '@/components/filter-account'
import { DateFilter } from '@/components/filter-date'

type Props = {}

export const Filters = (props: Props) => {
  return (
    <div className='flex flex-col lg:flex-row items-center gap-y-2 lg:gap-y-0 lg:gap-x-2'>
      <AccountFilter />
      <DateFilter />
    </div>
  )
}

