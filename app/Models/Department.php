<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Department extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'name',
        'code',
    ];

    /**
     * Get all of the sections for the Department
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function sections(): HasMany
    {
        return $this->hasMany(Section::class);
    }

    /**
     * Get all of the assetTransaction for the Department
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function assetTransaction(): HasMany
    {
        return $this->hasMany(AssetTransaction::class);
    }
}
