<?php

namespace App\Http\Controllers;

use App\Models\Material;
use Illuminate\Http\Request;

class MaterialController extends Controller
{
    public function store(Request $request)
    {
        $data = $request->validate([
            'course_id' => 'required|exists:courses,id',
            'title' => 'required',
            'content' => 'nullable',
            'video_url' => 'nullable',
            'order' => 'required|integer',
        ]);

        return Material::create($data);
    }

    public function show($id)
    {
        return Material::findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $material = Material::findOrFail($id);
        $material->update($request->all());
        return $material;
    }

    public function destroy($id)
    {
        Material::findOrFail($id)->delete();
        return response()->json(['message' => 'Material deleted']);
    }

    public function getByCourse($courseId)
    {
        $materials = Material::where('course_id', $courseId)
            ->orderBy('order', 'asc')
            ->get();

        return response()->json($materials);
    }

}
