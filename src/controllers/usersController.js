import { supabase } from "../config/supabase.js";

export const getUsers = async (req, res, next) => {
  try {
    const { data, error } = await supabase
      .from("projects")
      .select(`
        id,
        project_name,
        project_link,
        project_description,
        categories ( name ),
        project_technologies (
          technologies ( name )
        )
      `);

    if (error) throw error;

    // Formatear tecnologías como array plano
    const formattedData = data.map(project => ({
      id: project.id,
      project_name: project.project_name,
      project_link: project.project_link,
      project_description: project.project_description,
      category: project.categories?.name || null,
      technologies: project.project_technologies.map(pt => pt.technologies.name)
    }));

    res.json(formattedData);
  } catch (err) {
    next(err);
  }
};

export const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { data, error } = await supabase
      .from("categories")
      .select("*")
      .eq("id", id)
      .single();
    if (error) throw error;
    res.json(data);
  } catch (err) {
    next(err);
  }
};