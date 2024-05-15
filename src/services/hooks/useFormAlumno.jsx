import React, { useContext, useState } from 'react'
import { directus } from '../directus'
import { readItems } from '@directus/sdk'
import { GlobalContext } from '../global.context'
import { useNavigate } from 'react-router-dom'

const useFormAlumno = (validate, initialForm) => {
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const { dispatch } = useContext(GlobalContext)
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm({
      ...form,
      [name]: value,
    })
  }

  const handleBlur = (e) => {
    handleChange(e)
    // setErrors(validate(form))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const validationErrors = validate(form)
    setErrors(validationErrors)

    if (Object.keys(validationErrors).length === 0) {
      setLoading(true)

      try {
        const alumnos = await directus.request(readItems('Alumno'))
        const alumno = alumnos.find(
          (alumno) =>
            alumno.alumno_dni === form.alumno_dni
        )

        if (alumno) {
          dispatch({ type: 'LOGIN_ALUMNO', payload: alumno })
          navigate('/digital')
        } else {
          setErrors({
            alumno: 'No existe un Alumno con este DNI en la institución'
          })
        }
      } catch (error) {
        // Handle error in fetching data from directus
        console.error('Error en la consulta', error)
      } finally {
        setLoading(false)
      }
    }
  }

  return {
    form,
    errors,
    loading,
    handleBlur,
    handleChange,
    handleSubmit,
  }
}

export default useFormAlumno
