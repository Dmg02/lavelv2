export interface WorkspaceComment {
  id: string;
  content: string;
  author: string;
  timestamp: string;
}

export interface Workspace {
  timeline?: {
    id: string;
    description: string;
    actor: string;
    timestamp: string;
  }[];
  collaborators?: {
    id: string;
    name: string;
  }[];
  comments?: {
    id: string;
    content: string;
    author: string;
    timestamp: string;
  }[];
}

export type DemoLibraryFile = {
  id: string;
  name: string;
  type: 'pdf' | 'doc' | 'video' | 'audio' | 'image';
  case?: string;
  size: string;
  lastModified: string;
  tags: string[];
  contentPreview?: {
    text?: string;
    imageUrl?: string;
    videoUrl?: string;
  };
  aiSummary?: {
    summary: string;
    keyPoints: string[];
  };
  relatedFiles?: {
    id: string;
    name: string;
    relevance: number;
  }[];
  workspace?: Workspace;
};

export const libraryDemoEs = {
  search: {
    placeholder: "Buscar archivos...",
  },
  upload: {
    button: "Subir Archivos",
    dragDrop: "Arrastre y suelte archivos aquí",
  },
  fileTypes: {
    pdf: "Documento PDF",
    doc: "Documento Word",
    video: "Grabación de Video",
    audio: "Grabación de Audio",
    image: "Imagen",
  },
  actions: {
    download: "Descargar",
    share: "Compartir",
    delete: "Eliminar",
  },
  preview: {
    aiInsights: "Análisis IA",
    summary: "Resumen",
    keyPoints: "Puntos Clave",
    fileInfo: "Información del Archivo",
  },
  tabs: {
    preview: "Vista Previa",
    aiInsights: "IA Insights",
    changes: "Cambios",
    comments: "Comentarios"
  },
  fileInfo: {
    title: "Información del Archivo",
    sections: {
      details: {
        title: "Detalles",
        fileName: "Nombre del archivo",
        fileType: "Tipo de archivo",
        fileSize: "Tamaño",
        lastModified: "Última modificación",
        caseNumber: "Número de caso",
        tags: "Etiquetas"
      },
      aiSummary: {
        title: "Resumen IA",
        summary: "Resumen",
        keyPoints: "Puntos clave"
      },
      relatedFiles: {
        title: "Archivos Relacionados",
        relevance: "Relevancia"
      }
    }
  },
  filters: {
    all: 'Todos los Archivos',
    evidence: 'Evidencia',
    documents: 'Documentos',
    media: 'Medios',
    transcripts: 'Transcripciones'
  },
  demoFiles: [
    {
      id: "1",
      name: "Demanda Laboral - García vs Industrias XYZ.pdf",
      type: "pdf",
      case: "LAB/2024/0123",
      size: "3.8 MB",
      lastModified: "2024-03-20",
      tags: ["laboral", "activo", "urgente"],
      contentPreview: {
        text: `JUNTA LOCAL DE CONCILIACIÓN Y ARBITRAJE
CIUDAD DE MÉXICO
EXPEDIENTE: LAB/2024/0123

DEMANDA LABORAL

H. JUNTA LOCAL DE CONCILIACIÓN Y ARBITRAJE
PRESENTE

PEDRO GARCÍA LÓPEZ, por mi propio derecho, señalando como domicilio para oír y recibir notificaciones el ubicado en Calle Reforma 234, Col. Juárez, Alcaldía Cuauhtémoc, Ciudad de México, ante esta H. Junta comparezco y expongo:

Por medio del presente escrito vengo a demandar de INDUSTRIAS XYZ S.A. DE C.V., con domicilio en Av. Insurgentes Sur 1235, Col. Del Valle, Ciudad de México, las siguientes prestaciones:

A) El pago de indemnización constitucional por despido injustificado
B) El pago de salarios caídos desde la fecha del despido
C) El pago de aguinaldo proporcional 2024
D) El pago de vacaciones proporcionales 2024
E) El pago de prima vacacional proporcional 2024`
      },
      aiSummary: {
        summary: "Análisis de demanda laboral que revela elementos sólidos para acreditar despido injustificado. La estructura y prestaciones reclamadas cumplen con los requisitos del Art. 123 Constitucional y LFT. Recomendación de priorizar la reclamación de salarios caídos por su impacto económico significativo.",
        keyPoints: [
          "Cumple requisitos formales de demanda según Art. 872 LFT",
          "Alta probabilidad de éxito basada en jurisprudencia similar (Tesis: 2a./J. 125/2018)",
          "Riesgo identificado: Posible oferta de reinstalación que limitaría salarios caídos",
          "Oportunidad de negociación favorable por documentación completa de relación laboral"
        ]
      },
      relatedFiles: [
        {
          id: "2",
          name: "Carta de Despido.pdf",
          relevance: 0.95
        },
        {
          id: "3",
          name: "Contrato Individual de Trabajo.pdf",
          relevance: 0.90
        }
      ],
      workspace: {
        timeline: [
          {
            id: "t1",
            description: "Presentación de demanda inicial ante JLCA",
            actor: "Lic. Ana Ramírez",
            timestamp: "2024-03-20 10:30"
          },
          {
            id: "t2",
            description: "Asignación de número de expediente LAB/2024/0123",
            actor: "JLCA",
            timestamp: "2024-03-20 14:45"
          },
          {
            id: "t3",
            description: "Admisión de demanda y fijación de fecha para audiencia",
            actor: "JLCA",
            timestamp: "2024-03-25 09:15"
          },
          {
            id: "t4",
            description: "Notificación al demandado programada",
            actor: "Actuario Luis Torres",
            timestamp: "2024-03-28 11:00"
          },
          {
            id: "t5",
            description: "Preparación de documentación probatoria complementaria",
            actor: "Lic. Ana Ramírez",
            timestamp: "2024-04-02 15:30"
          }
        ],
        comments: [
          {
            id: "c1",
            content: "Revisar cálculo de prestaciones en sección C. El tiempo extra no está correctamente computado según Art. 67 LFT. Necesitamos recibos de nómina de últimos 6 meses.",
            author: "Lic. Ana Ramírez",
            timestamp: "2024-03-21 11:30"
          },
          {
            id: "c2",
            content: "Actualizar domicilio de la empresa demandada. Investigación corporativa muestra cambio reciente de domicilio fiscal. Solicitar verificación con Registro Público de Comercio.",
            author: "Lic. Carlos Mendoza",
            timestamp: "2024-03-22 14:45"
          },
          {
            id: "c3",
            content: "Preparé análisis de jurisprudencia similar (Tesis: 2a./J. 125/2018). Sugiero fortalecer argumento de despido injustificado citando esta tesis en apartado IV de la demanda.",
            author: "Lic. Miguel Ángel Rodríguez",
            timestamp: "2024-03-26 09:15"
          },
          {
            id: "c4",
            content: "Cliente proporcionó capturas de pantalla de mensajes de WhatsApp con supervisor. Debemos integrarlas como prueba superveniente según Art. 873-D LFT.",
            author: "Lic. Ana Ramírez",
            timestamp: "2024-04-01 16:20"
          },
          {
            id: "c5",
            content: "Contacté a dos testigos adicionales del área de producción. Confirman versión del despido y están dispuestos a declarar. Programar preparación de testimoniales.",
            author: "Lic. Carlos Mendoza",
            timestamp: "2024-04-03 10:45"
          }
        ]
      }
    },
    {
      id: "4",
      name: "Convenio de Terminación Laboral - Martínez.doc",
      type: "doc",
      case: "LAB/2024/0124",
      size: "1.8 MB",
      lastModified: "2024-04-05",
      tags: ["laboral", "convenios", "terminado"],
      contentPreview: {
        text: `CONVENIO DE TERMINACIÓN DE RELACIÓN LABORAL...`
      },
      aiSummary: {
        summary: "Análisis del convenio revela cumplimiento con Art. 33 LFT para validez ante JLCA. El monto de liquidación supera mínimos legales por 15%. La redacción de la renuncia y liberación de responsabilidades es jurídicamente robusta, minimizando riesgo de impugnación futura.",
        keyPoints: [
          "Estructura legal óptima según criterios JLCA para ratificación",
          "Cálculo de prestaciones excede requisitos del Art. 89 LFT",
          "Cláusula de confidencialidad específica y ejecutable",
          "Términos de pago favorables: 100% al momento de firma"
        ]
      },
      workspace: {
        timeline: [
          {
            id: "t1",
            description: "Solicitud inicial de elaboración de convenio",
            actor: "Recursos Humanos",
            timestamp: "2024-04-01 09:00"
          },
          {
            id: "t2",
            description: "Primera revisión de términos de convenio",
            actor: "Lic. Roberto Vega",
            timestamp: "2024-04-02 11:30"
          },
          {
            id: "t3",
            description: "Cálculo detallado de finiquito",
            actor: "CP. Juan Hernández",
            timestamp: "2024-04-03 14:15"
          },
          {
            id: "t4",
            description: "Envío de borrador a trabajadora para revisión",
            actor: "Lic. Roberto Vega",
            timestamp: "2024-04-04 10:00"
          },
          {
            id: "t5",
            description: "Programación de cita para firma ante JLCA",
            actor: "Lic. María Torres",
            timestamp: "2024-04-05 09:30"
          }
        ],
        comments: [
          {
            id: "c1",
            content: "Primera revisión completada. Necesario ajustar cláusula de confidencialidad según nueva jurisprudencia de SCJN sobre alcance post-laboral.",
            author: "Lic. Roberto Vega",
            timestamp: "2024-04-02 12:45"
          },
          {
            id: "c2",
            content: "Verificar inclusión de prima de antigüedad en cálculo. Trabajadora cumple requisitos del Art. 162 LFT.",
            author: "CP. Juan Hernández",
            timestamp: "2024-04-03 15:30"
          },
          {
            id: "c3",
            content: "Trabajadora solicita revisión del periodo de pago de aguinaldo. Ajustar conforme al Art. 87 LFT.",
            author: "Lic. María Torres",
            timestamp: "2024-04-04 11:15"
          },
          {
            id: "c4",
            content: "Preparados documentos soporte para ratificación. Incluir constancia de semanas cotizadas IMSS.",
            author: "Lic. Roberto Vega",
            timestamp: "2024-04-04 16:20"
          }
        ]
      }
    },
    {
      id: "6",
      name: "Audiencia Conciliatoria - Caso López.mp4",
      type: "video",
      case: "LAB/2024/0125",
      size: "180 MB",
      lastModified: "2024-05-15",
      tags: ["laboral", "audiencias", "conciliación"],
      contentPreview: {
        text: `TRANSCRIPCIÓN DE AUDIENCIA CONCILIATORIA...`
      },
      aiSummary: {
        summary: "Análisis de audiencia indica posición negociadora fuerte del trabajador. La oferta de reinstalación implica reconocimiento tácito de relación laboral, fortaleciendo posición para negociar indemnización.",
        keyPoints: [
          "Estrategia procesal: Empresa busca evitar carga probatoria del Art. 784 LFT",
          "Oferta económica 20% por debajo de expectativa según precedentes",
          "Identificados 3 elementos para contrademanda por horas extra",
          "Oportunidad de negociación por ausencia de controles de asistencia"
        ]
      },
      workspace: {
        timeline: [
          {
            id: "t1",
            description: "Inicio de audiencia conciliatoria",
            actor: "Actuario JLCA",
            timestamp: "2024-05-15 09:00"
          },
          {
            id: "t2",
            description: "Presentación de personería de las partes",
            actor: "Actuario JLCA",
            timestamp: "2024-05-15 09:15"
          },
          {
            id: "t3",
            description: "Primera propuesta de conciliación",
            actor: "Lic. Patricia Mendoza",
            timestamp: "2024-05-15 09:45"
          },
          {
            id: "t4",
            description: "Receso para consulta con cliente",
            actor: "Actuario JLCA",
            timestamp: "2024-05-15 10:30"
          },
          {
            id: "t5",
            description: "Continuación y discusión de contrapropuesta",
            actor: "Lic. Jorge Ruiz",
            timestamp: "2024-05-15 11:00"
          }
        ],
        comments: [
          {
            id: "c1",
            content: "Demandada ofrece reinstalación con pago limitado de salarios caídos. Analizar jurisprudencia sobre límite de 12 meses.",
            author: "Lic. Patricia Mendoza",
            timestamp: "2024-05-15 09:30"
          },
          {
            id: "c2",
            content: "Detectada inconsistencia en poder notarial de la empresa. Considerar como elemento de negociación.",
            author: "Lic. Jorge Ruiz",
            timestamp: "2024-05-15 10:00"
          },
          {
            id: "c3",
            content: "Cliente prefiere indemnización. Calcular propuesta incluyendo 20% prima antigüedad Art. 162 LFT.",
            author: "Lic. Patricia Mendoza",
            timestamp: "2024-05-15 10:45"
          },
          {
            id: "c4",
            content: "Revisar cálculo de horas extras en contrademanda. Documentación proporcionada sustenta reclamo Art. 68 LFT.",
            author: "Lic. Jorge Ruiz",
            timestamp: "2024-05-15 11:15"
          }
        ]
      }
    },
    {
      id: "8",
      name: "Testimonio - Acoso Laboral.mp3",
      type: "audio",
      case: "LAB/2024/0126",
      size: "25 MB",
      lastModified: "2024-06-01",
      tags: ["laboral", "testimonios", "acoso"],
      contentPreview: {
        text: `TRANSCRIPCIÓN DE TESTIMONIO
Expediente: Acoso Laboral Empresa Tecnológica
Testigo: Ana María Rodríguez
Puesto: Supervisora de Área
Fecha: 1 de junio 2024

[00:00] Abogado: "¿Puede describir los eventos del 15 de mayo?"
[00:15] Testigo: "Sí, presencié cuando el supervisor general..."
[05:30] Abogado: "¿Hubo más incidentes similares?"
[05:45] Testigo: "Sí, era un patrón de conducta que incluyó..."`
      },
      aiSummary: {
        summary: "Análisis del testimonio establece elementos constitutivos de acoso laboral según NOM-035-STPS-2018. Credibilidad del testigo fortalecida por jerarquía y documentación contemporánea. Testimonio vincula directamente conductas con afectación psicológica documentada en expediente médico.",
        keyPoints: [
          "Testimonio cumple criterios de admisibilidad del Art. 776 LFT",
          "Acreditación de 5 conductas específicas de acoso según Art. 3o Bis LFT",
          "Evidencia de conocimiento y omisión por parte de RRHH",
          "Nexo causal establecido entre conductas y daño psicológico"
        ]
      },
      workspace: {
        timeline: [
          {
            id: "t1",
            description: "Recepción inicial de testimonio grabado",
            actor: "Lic. Carmen Ortiz",
            timestamp: "2024-06-01 09:00"
          },
          {
            id: "t2",
            description: "Transcripción preliminar completada",
            actor: "Asistente Legal",
            timestamp: "2024-06-01 11:30"
          },
          {
            id: "t3",
            description: "Análisis de credibilidad del testimonio",
            actor: "Lic. Carmen Ortiz",
            timestamp: "2024-06-01 14:45"
          },
          {
            id: "t4",
            description: "Integración con expediente principal",
            actor: "Lic. David Soto",
            timestamp: "2024-06-01 16:20"
          },
          {
            id: "t5",
            description: "Preparación de interrogatorio complementario",
            actor: "Lic. Carmen Ortiz",
            timestamp: "2024-06-02 10:15"
          }
        ],
        comments: [
          {
            id: "c1",
            content: "Testimonio clave para establecer patrón sistemático de acoso. Identificados elementos específicos que violan NOM-035-STPS-2018.",
            author: "Lic. Carmen Ortiz",
            timestamp: "2024-06-01 10:30"
          },
          {
            id: "c2",
            content: "Transcripción revela inconsistencias en fechas reportadas a RRHH. Solicitar registros de entrada para corroborar.",
            author: "Lic. David Soto",
            timestamp: "2024-06-01 13:15"
          },
          {
            id: "c3",
            content: "Testigo menciona documentos internos relevantes. Preparar solicitud de exhibición según Art. 783 LFT.",
            author: "Lic. Carmen Ortiz",
            timestamp: "2024-06-01 15:45"
          },
          {
            id: "c4",
            content: "Necesario programar evaluación psicológica para fortalecer nexo causal con afectaciones mencionadas en testimonio.",
            author: "Dr. Laura Vázquez",
            timestamp: "2024-06-02 09:00"
          }
        ]
      },
      relatedFiles: [
        {
          id: "9",
          name: "Reporte Interno RRHH.pdf",
          relevance: 0.95
        }
      ]
    },
    {
      id: "10",
      name: "Inspección Condiciones Laborales.jpg",
      type: "image",
      case: "LAB/2024/0127",
      size: "5.5 MB",
      lastModified: "2024-07-10",
      tags: ["laboral", "evidencia", "seguridad"],
      contentPreview: {
        text: `REPORTE DE INSPECCIÓN DE CONDICIONES LABORALES
Caso: Demanda Colectiva - Seguridad Laboral
Fecha: 10 de julio 2024
Ubicación: Planta Industrial Norte
Inspector: Lic. Manuel Cervantes Díaz

DESCRIPCIÓN DE EVIDENCIA FOTOGRÁFICA:
- Condiciones de seguridad en área de producción
- Estado de equipo de protección personal
- Señalización de seguridad
- Salidas de emergencia
- Estaciones de trabajo`
      },
      aiSummary: {
        summary: "Análisis pericial de evidencia fotográfica identifica 12 violaciones específicas a la NOM-001-STPS-2008 y NOM-017-STPS-2008. Condiciones documentadas constituyen riesgo inminente según Art. 512-D LFT. Evidencia suficiente para sustentar demanda colectiva y solicitud de medidas precautorias.",
        keyPoints: [
          "Infracciones graves a 3 NOMs de seguridad laboral con riesgo inminente",
          "Evidencia admisible según criterios Art. 836 LFT para inspección",
          "Base para solicitud de medidas preventivas Art. 857 LFT",
          "Documentación técnica suficiente para denuncia ante STPS"
        ]
      },
      workspace: {
        timeline: [
          {
            id: "t1",
            description: "Inspección inicial del sitio",
            actor: "Ing. Roberto Méndez",
            timestamp: "2024-07-10 08:00"
          },
          {
            id: "t2",
            description: "Documentación fotográfica completada",
            actor: "Téc. Juan Pablo Rivas",
            timestamp: "2024-07-10 10:30"
          },
          {
            id: "t3",
            description: "Análisis técnico de condiciones de seguridad",
            actor: "Ing. Roberto Méndez",
            timestamp: "2024-07-10 13:45"
          },
          {
            id: "t4",
            description: "Elaboración de informe preliminar",
            actor: "Lic. Manuel Cervantes",
            timestamp: "2024-07-10 15:20"
          },
          {
            id: "t5",
            description: "Notificación a STPS por violaciones graves",
            actor: "Lic. Manuel Cervantes",
            timestamp: "2024-07-10 17:00"
          }
        ],
        comments: [
          {
            id: "c1",
            content: "Evidencia fotográfica muestra violaciones graves a NOM-001-STPS-2008. Priorizar medidas precautorias por riesgo inminente.",
            author: "Ing. Roberto Méndez",
            timestamp: "2024-07-10 11:30"
          },
          {
            id: "c2",
            content: "Documentadas obstrucciones en rutas de evacuación. Preparar denuncia inmediata ante Protección Civil.",
            author: "Téc. Juan Pablo Rivas",
            timestamp: "2024-07-10 14:15"
          },
          {
            id: "c3",
            content: "EPP en mal estado y sin registros de mantenimiento. Agregar violación específica a NOM-017-STPS-2008.",
            author: "Ing. Roberto Méndez",
            timestamp: "2024-07-10 16:00"
          },
          {
            id: "c4",
            content: "Recomiendo solicitud urgente de inspección oficial STPS. Condiciones actuales justifican suspensión de actividades.",
            author: "Lic. Manuel Cervantes",
            timestamp: "2024-07-10 17:30"
          }
        ]
      },
      relatedFiles: [
        {
          id: "11",
          name: "Reporte STPS.pdf",
          relevance: 0.90
        }
      ]
    }
  ]
} as const;
