import React, { useCallback } from 'react'
import { StringInputProps, set, insert, unset } from 'sanity'
import { Stack, TextInput } from '@sanity/ui'

export const FeaturePasteInput = (props: StringInputProps) => {
  const { onChange, value = '', elementProps } = props

  const handlePaste = useCallback(
    (event: React.ClipboardEvent<HTMLInputElement>) => {
      const pasteContent = event.clipboardData.getData('text')
      
      // Check if the content has multiple lines
      if (pasteContent.includes('\n')) {
        event.preventDefault()
        
        const lines = pasteContent
          .split('\n')
          .map((line) => line.trim())
          .filter((line) => line.length > 0)

        if (lines.length > 0) {
          // If we are pasting into an empty field, replace the whole array
          // Otherwise, insert the new lines after the current position
          onChange(insert(lines, 'after', [-1]))
        }
      }
    },
    [onChange]
  )

  return (
    <Stack space={3}>
      <TextInput
        {...elementProps}
        onPaste={handlePaste}
        value={value}
      />
    </Stack>
  )
}