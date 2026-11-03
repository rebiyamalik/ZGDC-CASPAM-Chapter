
if (dbEnabled) {
  try {
    await registerForEvent(rec)

    setState('done')
    form.reset()

  } catch (err) {
    console.error('Registration failed:', {
      code: err?.code,
      message: err?.message,
    })

    if (err?.code === 'full') {
      setState('full')

    } else if (
      err?.code === 'permission-denied' ||
      err?.code === 'already-exists'
    ) {
      setState('check')

    } else {
      setState('error')
    }
  }

  return
}
